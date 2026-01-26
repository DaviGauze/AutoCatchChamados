import pyautogui
import time

CONFIDENCE_LEVEL = 0.7 
CHECK_INTERVAL = 2

def pegar_chamado():
    print("Monitorando novos chamados no Desk Manager...")
    while True:
        try:
            target = pyautogui.locateCenterOnScreen('status_novo.png', confidence=CONFIDENCE_LEVEL)
            
            if target:
                pyautogui.moveTo(target, duration=0.1)
                print(f"Mouse movido para {target}.")
                
        except pyautogui.ImageNotFoundException:
            print(".", end="", flush=True) 
            
        except KeyboardInterrupt:
            print("\nAutomação interrompida.")
            break
            
        time.sleep(CHECK_INTERVAL)

pegar_chamado()