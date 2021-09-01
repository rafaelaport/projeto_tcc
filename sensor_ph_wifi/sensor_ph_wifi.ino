#include "WiFiEsp.h" 
#include "SoftwareSerial.h"

SoftwareSerial Serial1(6, 7); //PINOS QUE EMULAM A SERIAL, ONDE O PINO 6 É O RX E O PINO 7 É O TX

char ssid[] = "PORTUGAL 2 .G"; //VARIÁVEL QUE ARMAZENA O NOME DA REDE SEM FIO
char pass[] = "82316110";//VARIÁVEL QUE ARMAZENA A SENHA DA REDE SEM FIO

int status = WL_IDLE_STATUS; //STATUS TEMPORÁRIO ATRIBUÍDO QUANDO O WIFI É INICIALIZADO E PERMANECE ATIVO
//ATÉ QUE O NÚMERO DE TENTATIVAS EXPIRE (RESULTANDO EM WL_NO_SHIELD) OU QUE UMA CONEXÃO SEJA ESTABELECIDA
//(RESULTANDO EM WL_CONNECTED)

WiFiEspServer server(80); //CONEXÃO REALIZADA NA PORTA 80

float calibration_value = 21.44; //21.34 - 0.7;
int phval = 0; 
unsigned long int avgval; 
int buffer_arr[10], temp;
float ph_act;

void setup() 
{

  Serial.begin(9600); //INICIALIZA A SERIAL
  Serial1.begin(9600); //INICIALIZA A SERIAL PARA O ESP8266
  WiFi.init(&Serial1); //INICIALIZA A COMUNICAÇÃO SERIAL COM O ESP8266
  WiFi.config(IPAddress(192,168,0,20)); //COLOQUE UMA FAIXA DE IP DISPONÍVEL DO SEU ROTEADOR

  //INÍCIO - VERIFICA SE O ESP8266 ESTÁ CONECTADO AO ARDUINO, CONECTA A REDE SEM FIO E INICIA O WEBSERVER
  if(WiFi.status() == WL_NO_SHIELD){
  
    while (true);
  }
  
  while(status != WL_CONNECTED){
    
    status = WiFi.begin(ssid, pass);
  }
  server.begin();
  //FIM - VERIFICA SE O ESP8266 ESTÁ CONECTADO AO ARDUINO, CONECTA A REDE SEM FIO E INICIA O WEBSERVER
  
 Serial.begin(9600);
}

void loop() {

  wifi();
  
}

void wifi(){

  WiFiEspClient client = server.available(); //ATENDE AS SOLICITAÇÕES DO CLIENTE
  
  if (client) { //SE CLIENTE TENTAR SE CONECTAR, FAZ

    boolean currentLineIsBlank = true; // an http request ends with a blank line
    
    while (client.connected()){ //ENQUANTO O CLIENTE ESTIVER CONECTADO, FAZ
          
      if(client.available()){ //SE EXISTIR REQUISIÇÃO DO CLIENTE, FAZ
      
        char c = client.read(); //LÊ A REQUISIÇÃO DO CLIENTE


        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply

          if(c == '\n' && currentLineIsBlank){ 
          Serial.println("com delay");

          sensor();
          
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: application/json");
          client.println("Connection: close");  // the connection will be closed after completion of the response
          client.println();
          client.println("{ \"leitura_ph\": ");
          client.println(ph_act);
          client.println("}");

          delay(1);
          client.stop(); //FINALIZA A REQUISIÇÃO HTTP E DESCONECTA O CLIENTE
          
          }
        
        if (c == '\n') {
          
          // you're starting a new line
          currentLineIsBlank = true;
          
        } else if (c != '\r') {
          
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        
        }
      }
    }
    
    delay(1);
    client.stop(); //FINALIZA A REQUISIÇÃO HTTP E DESCONECTA O CLIENTE
  }
}

void sensor(){
  // captura 10 leituras das tensões da porta analógica
  for(int i = 0; i < 10; i++) 
    { 
      buffer_arr[i] = analogRead(A0);
      delay(30);
    }

  // ordena o array
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
     
  avgval=0;
  // soma as amostras
    for(int i = 2; i < 8; i++)
      avgval += buffer_arr[i];

    // 5.0 (voltagem que o sensor está ligado)
    // 1024 faz conversão para digital 
    // 6 média ponderada baseada na amostra das 10 posições do array 
    float volt = (float) avgval * 5.0 / 1024 / 6; 
    ph_act = -5.70 * volt + calibration_value;

    Serial.print("pH Val: ");
    Serial.println(ph_act);
    //delay(1000);
    
}
