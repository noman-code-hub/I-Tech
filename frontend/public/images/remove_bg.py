import sys
from PIL import Image
import pillow_avif

def remove_background(input_path, output_path):
    print(f"Opening {input_path}...")
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Replace white (or near white) with transparent
    for item in datas:
        # Check if pixel is white or near-white (threshold 240)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    remove_background("Logo.avif", "Logo.png")
