import Complaint from "../models/Complaint.js";
import ImageKit from "imagekit";

export async function listRecent(_req, res) {
  const items = await Complaint.find({}).sort({ created_at: -1 }).limit(5);
  res.json(items);
}

export async function listAll(_req, res) {
  const items = await Complaint.find({}).sort({ created_at: -1 });
  res.json(items);
}

export async function createComplaint(req, res) {
  const { title, description, address } = req.body;
  let { location_coords } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });

  let photoUrls = [];
  try {
    const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } =
      process.env;
    if (
      !IMAGEKIT_PUBLIC_KEY ||
      !IMAGEKIT_PRIVATE_KEY ||
      !IMAGEKIT_URL_ENDPOINT
    ) {
      if (req.files && (req.files.photo || req.files.photos)) {
        return res.status(500).json({ message: "ImageKit not configured" });
      }
    }

    const imagekit =
      IMAGEKIT_PUBLIC_KEY && IMAGEKIT_PRIVATE_KEY && IMAGEKIT_URL_ENDPOINT
        ? new ImageKit({
            publicKey: IMAGEKIT_PUBLIC_KEY,
            privateKey: IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: IMAGEKIT_URL_ENDPOINT,
          })
        : null;

    const files = Array.isArray(req.files) ? req.files : [];

    for (const f of files) {
      const safeName =
        (f.originalname || "photo").replace(/[^a-zA-Z0-9._-]/g, "") ||
        "photo.jpg";
      if (imagekit) {
        const result = await imagekit.upload({
          file: f.buffer,
          fileName: `complaint_${Date.now()}_${safeName}`,
          folder: "clean_street/complaints",
        });
        photoUrls.push(result.url);
      }
    }
  } catch (e) {
    return res.status(500).json({ message: "Photo upload failed" });
  }

  const c = await Complaint.create({
    // FIX: Changed 'user_id' to 'user' for consistency with Mongoose conventions
    user: req.user.id,
    title,
    description,
    photos: photoUrls,
    location_coords: location_coords || "",
    address,
  });
  res.status(201).json(c);
}

// --- NEW FUNCTIONS ---

/**
 * Get a single complaint by its ID
 */
export async function getComplaintById(req, res) {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('user', 'name email');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

/**
 * Delete a complaint by its ID
 */
export async function deleteComplaint(req, res) {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // CRITICAL: Permission Check!
    // Ensure the user trying to delete is the one who created the complaint.
    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own complaints' });
    }

    await complaint.deleteOne();

    res.json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}