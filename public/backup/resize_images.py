from PIL import Image
import os

# List of input images
input_images = ['axilum.webp', 'engie.webp', 'gunnebo.webp', 'obs.webp', 'portfolio.webp', 'salaires.dev.webp']

# List of desired widths for resizing
sizes = [320, 375, 414, 768, 1024, 1280, 1440, 1920, 2560]

# Create a directory to store the resized images
if not os.path.exists('resized_images'):
    os.makedirs('resized_images')

# Loop through each image and resize it for each width
for image in input_images:
    try:
        img = Image.open(image)
        img_name = os.path.splitext(image)[0]
        for size in sizes:
            # Maintain the aspect ratio when resizing
            new_height = int(size * img.height / img.width)
            img_resized = img.resize((size, new_height))

            # Save the resized image
            img_resized.save(f"resized_images/{img_name}-{size}w.webp", "WEBP")
            print(f"Created {img_name}-{size}w.webp with size {size}x{new_height}")
    except Exception as e:
        print(f"Error processing {image}: {e}")
