int ph_Value;
float Voltage;

void setup() {

Serial.begin(9600);
pinMode(ph_Value, INPUT);

}

void loop() {

  ph_Value = analogRead(A0);
  Voltage = ph_Value * (5.0 / 1023.0);
  Serial.println(Voltage);
  delay(500);

}
