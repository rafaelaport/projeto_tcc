#include "WiFiEsp.h" 
#include "SoftwareSerial.h"

SoftwareSerial Serial1(6, 7); 

char ssid[] = "PORTUGAL 2 .G"; //Nome da rede wi-fi configurada previamente 
char pass[] = "82316110"; //Senha da rede wi-fi configurada previamente 

int status = WL_IDLE_STATUS; 

WiFiEspServer server(80); // Porta 80
 
unsigned long int soma; 
int buffer_arr[10], temp;
float ph;
String req = "";
float capacidadeLitros;
float quantidadeProduto;
String tipoProduto = "";

void setup() 
{

  Serial.begin(9600);
  Serial1.begin(9600);
  WiFi.init(&Serial1);

  WiFi.config(IPAddress(192,168,0,22)); //Faixa de IP disponível no roteador, configurada previamente

  if(WiFi.status() == WL_NO_SHIELD){
    while (true);
  }
  
  while(status != WL_CONNECTED){
    status = WiFi.begin(ssid, pass);
  }

  server.begin();
  
  Serial.begin(9600);
  req = "";
}

void loop() {

  wifi();
  
}

void wifi(){

  WiFiEspClient client = server.available();
  
  if (client) { 

    boolean currentLineIsBlank = true; 
    
    while (client.connected()){ 
          
      if(client.available()){ 
      
        char c = client.read();
        
        req += c;

        if (c == '\n' && currentLineIsBlank) {

          if (req.indexOf("?")<=0){
            Serial.println("Parâmetro de Capacidade obrigatório.");
            
          }else {
            String inicioStringCapacidade = req.substring(req.indexOf("?")+12);
            String finalStringCapacidade = inicioStringCapacidade.substring(0, inicioStringCapacidade.indexOf(" "));
            capacidadeLitros = finalStringCapacidade.toFloat();
          }

          leituraPh();
          calcularSubstancia();

          // Montando json de retorno 
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: application/json");
          client.println("Connection: close");  
          client.println();
          client.println("{ \"leitura_ph\": ");
          client.println(ph);
          client.println(",");
          client.println("\"quantidade_produto\": ");
          client.println(quantidadeProduto);
          client.println(",");
          client.println("\"tipo_produto\": ");
          client.print("\"");
          client.print(tipoProduto);
          client.print("\"");
          client.println("}");

          req="";
          break;
        }

        if (c == '\n') 
        currentLineIsBlank = true; 
        
        else if (c != '\r') 
        currentLineIsBlank = false;
       
      }
    }
    
    delay(1);
    client.stop(); 
  }
}

void leituraPh(){

  // Captura 10 leituras das tensões da porta analógica
  for(int i = 0; i < 10; i++) 
    { 
      buffer_arr[i] = analogRead(A0);
      delay(30);
    }

  // Ordena o array
  for(int i = 0; i < 9; i++)
    {
      for(int j = i + 1; j<10; j++)
        {
          if(buffer_arr[i] > buffer_arr[j])
           {
              temp = buffer_arr[i];
              buffer_arr[i] = buffer_arr[j];
              buffer_arr[j] = temp;
            }
        }
     }
     
  
  // Soma as amostras
  soma = 0;

  for(int i = 2; i < 8; i++)
    soma += buffer_arr[i];

    // 5.0 (voltagem que o sensor está ligado)
    // 1024 faz conversão para digital 
    // 6 média ponderada baseada na amostra das 10 posições do array 
    float volt = (float) soma * 5.0 / 1024 / 6; 

    // Fórmula para calcular o ph usando o sensor do módulo E-201
    
    ph = -5.70 * volt + 21.44;

    Serial.print("pH Val: ");
    Serial.println(ph);
    
}

void calcularSubstancia(){

  if (ph >= 7.4 && ph <= 8) {
    
    // redutor 13ml/m3
    // 1000 L = 1m3
    
    float capacidadeMetrosCubicos = capacidadeLitros / 1000;
    quantidadeProduto = 13 * capacidadeMetrosCubicos;
    tipoProduto = "Redutor(ml)";
  }

  if (ph > 8) {
    
    //redutor 25ml/m3

    float capacidadeMetrosCubicos = capacidadeLitros / 1000;
    quantidadeProduto = 25 * capacidadeMetrosCubicos;
    tipoProduto =  "Redutor(ml)";
  }

  if (ph >= 6.8 && ph <= 7) {
    
    //elevador 15ml/m3            
    
    float capacidadeMetrosCubicos = capacidadeLitros / 1000;
    quantidadeProduto = 15 * capacidadeMetrosCubicos;
    tipoProduto = "Elevador(ml)";
  }

  if (ph < 6.8) {
    
    //elevador 20ml/m3
    
    float capacidadeMetrosCubicos = capacidadeLitros / 1000;
    quantidadeProduto = 20 * capacidadeMetrosCubicos;
    tipoProduto = 'Elevador(ml)';
  }

  Serial.print("Quantidade Produto: ");
  Serial.println(quantidadeProduto);

  Serial.print("Tipo Produto: ");
  Serial.println(tipoProduto);

}
