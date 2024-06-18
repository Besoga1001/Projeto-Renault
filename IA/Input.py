import pandas as pd
from joblib import load

preprocessor = load('IA/models/preprocessor.pkl')
model = load('IA/models/model.pkl')

print("Digite a seguir as informações solicitadas")
R1 = input("Área responsável pela identificação: ")
R2 = input("Projeto: ")
R3 = input("Jalón Afetado: ")
R4 = input("Impacto: ")

problema = pd.DataFrame({
    'Área responsável pela identificação': [R1],
    'Projeto': [R2],
    'Jalón Afetado': [R3],
    'Impacto (Renault)': [R4],
})

print("Colunas do new_data:", problema.columns)
print("Colunas esperadas:", preprocessor.transformers_[0][2])

oneHotEncode = preprocessor.transform(problema)

predictions = model.predict(oneHotEncode)

print("Previsão:", predictions)

