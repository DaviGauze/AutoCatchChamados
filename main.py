import pyautogui
import time
from google import genai
from google.genai import types
from PIL import Image
import json

client = genai.Client(api_key="")

def capturar_chamados(image_path, target_text):
    image = image.open(image_path)
    width, height = image.size

    prompt = "Detect all of the objects with the text, NOVO and TRANFERENCIA, and return their bounding boxes in the format [y1, x1, y2, x2] where the coordinates are normalized between 0 and 1000."



    config = types.GenerateContentConfig(
    response_mime_type="application/json"
    )

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=[image, prompt],
        config=config
    )

    try:
        detections = json.loads(response.text)

        converted_boxes = []
        for det in detections:
            ymin, xmin, ymax, xmax = det["box_2d"]

            abs_x1 = int(xmin / 1000 * width)
            abs_y1 = int(ymin / 1000 * height)
            abs_x2 = int(xmax / 1000 * width)
            abs_y2 = int(ymax / 1000 * height)

            center_x = (abs_x1 + abs_x2) // 2
            center_y = (abs_y1 + abs_y2) // 2

            converted_boxes.append({
              "label": det.get("label", "target"),
                "box": [abs_x1, abs_y1, abs_x2, abs_y2],
                "center": (center_x, center_y)
            })

            return converted_boxes
    except Exception as e:
        print(f"Erro ao processar imagem {image_path}: {e}")
        return []
    
print("Buscando botão NOVO...")
resultados = get_buttons_coordinates("status_novo.png", "NOVO")

for item in resultados:
    print(f"Encontrado: {item['label']} em {item['box']} | Centro: {item['center']}")