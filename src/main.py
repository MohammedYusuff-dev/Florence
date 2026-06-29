import os
import sys
import vtracer
from utils.quality import verify_true_format, analyze_dimensions, calculate_blur_score

def run_logo_pipeline(input_image_path, output_svg_path):
    print("=" * 60)
    print(f"STARTING ANALYSIS FOR: {os.path.basename(input_image_path^)}")
    print("=" * 60)
    if not os.path.exists(input_image_path):
        print(f"[-] Error: File not found at {input_image_path}")
        return
    mime = verify_true_format(input_image_path)
    print(f"[+] True Content MIME-Type: {mime}")
    if "svg" in mime or input_image_path.lower().endswith(".svg"):
        print("[!] Input logo is already a vector format!")
        return
    width, height = analyze_dimensions(input_image_path)
    print(f"[+] Logo Dimensions: {width}px x {height}px")
    blur_score = calculate_blur_score(input_image_path)
    print(f"[+] Edge Clarity Score: {blur_score}")
    print("\n[+] Initializing Raster-to-Vector Engine...")
    try:
        vtracer.convert_image_to_svg(input_image_path, output_svg_path)
        print(f"[SUCCESS] Vector asset exported to: {output_svg_path}")
    except Exception as e:
        print(f"[-] Vectorization failed: {str(e^)}")

if __name__ == "__main__":
    TEST_INPUT = os.path.join("data", "input_raster", "sample_logo.png")
    TEST_OUTPUT = os.path.join("data", "output_vector", "sample_logo.svg")
    if len(sys.argv) > 1:
        run_logo_pipeline(sys.argv[1], TEST_OUTPUT)
    else:
        if os.path.exists(TEST_INPUT):
            run_logo_pipeline(TEST_INPUT, TEST_OUTPUT)
        else:
            print("Drop a logo image into data/input_raster/sample_logo.png to test.")
