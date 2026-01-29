import pyautogui
import time

CONFIDENCE_LEVEL = 0.68 
CHECK_INTERVAL = 2
status = ['status_novo.png','status_transf.png']
status_target = {
    ('status_transf.png', 0.5),
    ('status_novo.png', 0.75)
}

def pegar_chamado():
    print("Monitorando novos chamados no Desk Manager...")
    try:
        while True:
            try:
                for imagem, precisao in status_target:
                    target = pyautogui.locateCenterOnScreen(imagem, confidence=precisao)

                    if target:
                        pyautogui.click(target, duration=0.1)
                        print(f"Chamado Capturado, Mouse movido para {target}.")
                        time.sleep(2)
                    
            except pyautogui.ImageNotFoundException:
                print("Procurando novos chamados.\n", end="", flush=True) 

            time.sleep(CHECK_INTERVAL)
                
    except KeyboardInterrupt:
        print("\nParando a busca por chamados.")              
            
pegar_chamado()