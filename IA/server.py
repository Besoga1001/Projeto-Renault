from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

preprocessor = joblib.load('IA/models/preprocessor.joblib')
model = joblib.load('IA/models/model.joblib')

# # Lista de valores válidos para a coluna 'jalon'
valores_validos_area = ['APO', 'DEA-TD']
valores_validos_projeto = ['CARRO 1', 'CARRO 2', 'CARRO 3', 'CARRO 4', 'CARRO 5', 'CARRO 6', 'CARRO 7', 'CARRO 8', 'CARRO 9', 'CARRO 10', 'CARRO 11', 'CARRO 12', 'CARRO 13', 'CARRO 14', 'CARRO 15']
valores_validos_jalon = ['ABDLot-cp', 'ABP', 'ABPT', 'ABVC', 'CO', 'Cp', 'Doc Completion', 'Doc Série', 'MA', 'Nenhum', 'PPC', 'TDU', 'TGA']

# # Função para verificar se o valor de 'jalon' é válido
def check_supported(value, lista_tema):
    for lista in lista_tema:
        if value != lista:
            value = lista[1]
            break


@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json

        area = input_data['area']
        projeto = input_data['projeto']
        jalon = input_data['jalon']

        check_supported(area, valores_validos_area)
        check_supported(projeto, valores_validos_projeto)
        check_supported(jalon, valores_validos_jalon)

        problema = pd.DataFrame({
        'Área responsável pela identificação': [area],
        'Projeto': [projeto],
        'Jalón Afetado': [jalon],
        })

        print("Colunas do new_data:", problema.columns)
        print("Colunas esperadas:", preprocessor.transformers_[0][2])

        oneHotEncode = preprocessor.transform(problema)

        predictions = model.predict(oneHotEncode)
        predictions_list = predictions.tolist()

        return jsonify({'prediction': predictions_list,}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)