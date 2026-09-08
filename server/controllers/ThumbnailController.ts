import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import cloudinary from "../configs/cloudinary.js";

const stylePrompts = {
  "Bold & Graphic":
    "eye-catching YouTube thumbnail, bold visual composition, vibrant colors, dramatic lighting, high contrast, strong visual hierarchy, click-worthy composition, professional creator thumbnail style",

  "Tech/Futuristic":
    "futuristic visual design, sleek modern aesthetics, digital UI elements, glowing accents, holographic effects, cyber-tech atmosphere, sharp lighting, high-tech visual treatment",

  Minimalist:
    "minimalist visual design, clean composition, simple shapes, limited color palette, balanced negative space, modern polished aesthetic, clear focal point",

  Photorealistic:
    "photorealistic visual style, ultra-realistic lighting, natural textures, realistic materials, cinematic photography, shallow depth of field, professional photography quality",

  Illustrated:
    "creative digital illustration, stylized visual elements, bold outlines, vibrant colors, expressive shapes, polished illustration style, modern graphic artwork",
};

const colorSchemeDescriptions = {
  vibrant:
    "vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette",
  sunset:
    "warm sunset tones, orange, pink and purple hues, soft gradients, cinematic glow",
  forest:
    "natural green tones, earthy colors, calm and organic palette, fresh atmosphere",
  neon:
    "neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow",
  purple:
    "purple-dominant color palette, magenta and violet tones, modern and stylish mood",
  monochrome:
    "black and white color scheme, high contrast, dramatic lighting, timeless aesthetic",
  ocean:
    "cool blue and teal tones, aquatic color palette, fresh and clean atmosphere",
  pastel:
    "soft pastel colors, low saturation, gentle tones, aesthetic and calming atmosphere",
  gold:
    "luxurious gold and black color palette, premium feel, elegant highlights",
  red:
    "bold red accents, energetic, high urgency, attention-grabbing composition",
  blue:
    "professional blue tones, trustworthy, modern technology aesthetic",
  dark:
    "dark mode theme, cinematic shadows, moody lighting, premium appearance",
  gradient:
    "smooth colorful gradients, modern UI style, vibrant transitions",
};

const aspectRatioDimensions: Record<
  string,
  { width: number; height: number }
> = {
  "16:9": { width: 1280, height: 720 },
  "1:1": { width: 1280, height: 1280 },
  "9:16": { width: 720, height: 1280 },
};

export const generateThumbnail = async (
  req: Request,
  res: Response,
) => {
  let thumbnailId: string | undefined;

  try {
    const { userID } = req.session;

    if (!userID) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio = "16:9",
      color_scheme,
      text_overlay = false,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!style) {
      return res.status(400).json({ message: "Thumbnail style is required" });
    }

    // ---------------------------------------------------------
    // CREATE THUMBNAIL DOCUMENT
    // ---------------------------------------------------------

    const thumbnail = await Thumbnail.create({
      userID,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    thumbnailId = thumbnail._id.toString();

    // ---------------------------------------------------------
    // GET OUTPUT DIMENSIONS
    // ---------------------------------------------------------

    const dimensions =
      aspectRatioDimensions[aspect_ratio] ||
      aspectRatioDimensions["16:9"];

    // ---------------------------------------------------------
    // BUILD TITLE-FIRST PROMPT FOR LUCID ORIGIN
    // ---------------------------------------------------------

    let finalPrompt = `
Create a professional, high-click-through YouTube thumbnail based primarily on this exact title:

"${title}"

TITLE-FIRST CREATIVE DIRECTION:

Understand the meaning, subject, intent and keywords of the title before creating the image.

The title is the MAIN subject of the thumbnail. Build the visual concept around what the title is actually about.

Choose the most relevant visual elements for the topic yourself. Depending on the title, these may include people, products, objects, food, technology, devices, money, charts, graphs, logos, symbols, locations, environments, UI elements, illustrations, icons, or other topic-specific visual elements.

Do NOT use a fixed thumbnail template.
Do NOT force a person into every thumbnail.
Do NOT force a laptop into every thumbnail.
Do NOT force a human face into every thumbnail.
Do NOT force any particular object unless it is relevant to the title.
Do NOT always place the main subject on the left or right.
Do NOT always use the same composition.

The composition must change naturally according to the topic.
Create a visually interesting and balanced composition that communicates the title immediately when someone sees the thumbnail.

Prioritize strong visual storytelling, a clear focal point, depth, contrast, dramatic lighting and professional YouTube thumbnail design.

The generated image should feel like a custom thumbnail created specifically for this title, not like a reusable template.
`;

    // ---------------------------------------------------------
    // STYLE
    // ---------------------------------------------------------

    const styleDescription =
      stylePrompts[style as keyof typeof stylePrompts] || style;

    finalPrompt += `

VISUAL STYLE:

${styleDescription}

Use this style as the visual treatment of the thumbnail, while keeping the subject and composition completely driven by the title.
`;

    // ---------------------------------------------------------
    // COLOR SCHEME
    // ---------------------------------------------------------

    if (color_scheme) {
      const colorDescription =
        colorSchemeDescriptions[
          color_scheme as keyof typeof colorSchemeDescriptions
        ];

      if (colorDescription) {
        finalPrompt += `

COLOR SCHEME:

${colorDescription}

Apply the color scheme naturally to the entire composition.
Do not create an unnecessary solid or plain background just to make the text readable.
`;
      }
    }

    // ---------------------------------------------------------
    // USER PROMPT
    // ---------------------------------------------------------

    if (user_prompt) {
      finalPrompt += `

ADDITIONAL USER DIRECTION:

${user_prompt}

Treat this as additional creative direction. It must enhance or modify the title-based concept rather than replacing the main meaning of the title.
`;
    }

    // ---------------------------------------------------------
    // TEXT OVERLAY
    // ---------------------------------------------------------

    if (text_overlay) {
      finalPrompt += `

TITLE TEXT:

The exact title that must appear inside the thumbnail is:

"${title}"

Render this exact title clearly and accurately.

Typography should look like professional high-CTR YouTube thumbnail typography.

Use bold, large, readable lettering with strong visual hierarchy.

Choose the typography treatment that best matches the generated composition. Appropriate treatments may include colorful text, white or yellow text, accent colors, outlines, shadows, glow, stroke effects, gradients, banners, labels, highlighted words, or other polished graphic treatments.

The title must be integrated naturally into the actual composition.

IMPORTANT:
- Keep the original background and visual environment visible around the text.
- Do not create a large plain black rectangle behind the title.
- Do not create an unnecessary solid black text panel.
- Do not hide the main visual just to make room for text.
- The background should continue naturally behind and around the typography.
- Use contrast, outline, shadow, glow, color or positioning to make the title readable.
- Do not duplicate the title.
- Do not invent extra words.
- Do not misspell the title.
- Do not change the wording of the title.
`;
    } else {
      finalPrompt += `

TEXT:

Do not generate title text, captions, subtitles, labels, watermarks, logos or unnecessary typography.

Keep the visual itself strong and topic-focused.
`;
    }

    // ---------------------------------------------------------
    // FINAL COMPOSITION
    // ---------------------------------------------------------

    finalPrompt += `

COMPOSITION:

Create a dynamic, professional thumbnail composition specifically for the topic in the title.

Use the available canvas intelligently.

The placement of people, products, objects, text and background elements must be decided according to the subject and visual story.

Avoid repetitive layouts.

Do not force empty black areas, plain backgrounds, fixed subject positions or generic stock-photo compositions.

Keep important visual elements inside the safe area and make the thumbnail immediately understandable at a small size.

Aspect ratio: ${aspect_ratio}
`;

    // ---------------------------------------------------------
    // CALL CLOUDFLARE WORKERS AI - LUCID ORIGIN
    // ---------------------------------------------------------

    const model = "@cf/leonardo/lucid-origin";

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      throw new Error(
        "Cloudflare credentials are missing from environment variables",
      );
    }

    const cloudflareUrl =
      `https://api.cloudflare.com/client/v4/accounts/` +
      `${accountId}/ai/run/${model}`;

    const response = await fetch(cloudflareUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: finalPrompt,
        width: dimensions.width,
        height: dimensions.height,
        guidance: 7,
        num_steps: 20,
      }),
    });

    const cloudflareData: any = await response.json();

    // ---------------------------------------------------------
    // HANDLE CLOUDFLARE RESPONSE
    // ---------------------------------------------------------

    if (!response.ok || !cloudflareData.success) {
      console.error(
        "Cloudflare API Error:",
        JSON.stringify(cloudflareData, null, 2),
      );

      const errorMessage =
        cloudflareData?.errors?.[0]?.message ||
        "Cloudflare image generation failed";

      throw new Error(errorMessage);
    }

    const base64Image = cloudflareData?.result?.image;

    if (!base64Image) {
      throw new Error("Cloudflare returned no image data");
    }

    // ---------------------------------------------------------
    // UPLOAD GENERATED IMAGE TO CLOUDINARY
    // ---------------------------------------------------------

    let uploadResult;

    try {
      uploadResult = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64Image}`,
        {
          resource_type: "image",
          folder: "thumbcraft",
          transformation: [
            {
              width: dimensions.width,
              height: dimensions.height,
              crop: "fill",
              gravity: "auto",
            },
          ],
        },
      );
    } catch (cloudinaryError: any) {
      console.error(
        "Cloudinary Upload Error:",
        cloudinaryError?.message || cloudinaryError,
      );

      throw cloudinaryError;
    }

    // ---------------------------------------------------------
    // UPDATE MONGODB DOCUMENT
    // ---------------------------------------------------------

    thumbnail.image_url = uploadResult.secure_url;
    thumbnail.isGenerating = false;

    await thumbnail.save();

    // ---------------------------------------------------------
    // SUCCESS RESPONSE
    // ---------------------------------------------------------

    return res.status(201).json({
      message: "Thumbnail Generated",
      thumbnail,
    });
  } catch (error: any) {
    console.error("Thumbnail Generation Error:", error);

    // ---------------------------------------------------------
    // REMOVE FAILED THUMBNAIL DOCUMENT
    // ---------------------------------------------------------

    if (thumbnailId) {
      try {
        await Thumbnail.findByIdAndDelete(thumbnailId);
      } catch (deleteError) {
        console.error(
          "Failed to remove incomplete thumbnail:",
          deleteError,
        );
      }
    }

    return res.status(500).json({
      message:
        error?.message ||
        "Failed to generate thumbnail",
    });
  }
};

// ---------------------------------------------------------
// GET MY THUMBNAILS
// ---------------------------------------------------------

export const getMyThumbnails = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userID } = req.session;

    if (!userID) {
      return res.status(401).json({
        message: "You are not logged in",
      });
    }

    const thumbnails = await Thumbnail.find({
      userID,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      thumbnails,
    });
  } catch (error: any) {
    console.error("Fetch Thumbnails Error:", error);

    return res.status(500).json({
      message:
        error?.message ||
        "Failed to fetch thumbnails",
    });
  }
};

// ---------------------------------------------------------
// DELETE THUMBNAIL
// ---------------------------------------------------------

export const deleteThumbnail = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { userID } = req.session;

    if (!userID) {
      return res.status(401).json({
        message: "You are not logged in",
      });
    }

    const deletedThumbnail =
      await Thumbnail.findOneAndDelete({
        _id: id,
        userID,
      });

    if (!deletedThumbnail) {
      return res.status(404).json({
        message: "Thumbnail not found",
      });
    }

    return res.json({
      message: "Thumbnail deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Thumbnail Error:", error);

    return res.status(500).json({
      message:
        error?.message ||
        "Failed to delete thumbnail",
    });
  }
};
