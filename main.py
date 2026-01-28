import pyautogui
import time

CONFIDENCE_LEVEL = 0.7 
CHECK_INTERVAL = 2

def pegar_chamado():
    print("Monitorando novos chamados no Desk Manager...")
    try:
        while True:
            try:
                target = pyautogui.locateCenterOnScreen('status_novo.png', confidence=CONFIDENCE_LEVEL)
                
                if target:
                    pyautogui.click(target, duration=0.1)
                    print(f"Chamado encontrado, Mouse movido para {target}.")
                    
            except pyautogui.ImageNotFoundException:
                print("Procurando novos chamados.\n", end="", flush=True) 

            time.sleep(CHECK_INTERVAL)
                
    except KeyboardInterrupt:
        print("\nParando a busca por chamados.")              
            
pegar_chamado()