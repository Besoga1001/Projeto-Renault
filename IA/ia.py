import pandas as pd
import matplotlib.pyplot as plt
import os

from joblib import dump
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from warnings import simplefilter
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score

simplefilter(action="ignore", category=pd.errors.PerformanceWarning)

file_path = 'IA/DataSet/RenaultData.xlsm'

if os.path.exists(file_path):
    print(f"O arquivo {file_path} foi encontrado.")
else:
    print(f"O arquivo {file_path} NÃO foi encontrado.")

try:
    df = pd.read_excel(file_path, header=4, usecols="C:AF", sheet_name="List of risks")
    
    df.columns = df.columns.str.strip()

    df.drop(
        [
            'Risco', 'Tipo de risco', 'Data de entrada do risco', 'Metier', 'Ação', 'Nome do Piloto', "ID do Piloto", 
            "Início do Plano de Ação", "Data de Alerta", "Tempo de Resolução", "Hora", "Comentários", "Data de Resolução", 
            "Status", "Capitalização", 'Probabilidade', 'Impacto', 'Impacto/Consequências', 'Jalón Impactado no Futuro', 
            'Estratégia', 'Probabilidade Residual', 'Impacto Residual', 'Classificação de Risco Residual', 'Validação da Ação', 
            'Validação do Risco', 'Impacto (Renault)'
        ],
        axis=1,
        inplace=True
    )

    df.dropna(inplace=True)

    print("Nomes das colunas:")
    print(df.columns)

    Y = df['Classificação de Risco']
    X = df.drop('Classificação de Risco', axis=1)

    categorical_columns = X.select_dtypes(include=['object']).columns

    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(), categorical_columns)
        ],
        remainder='passthrough'
    )

    X_transformed = preprocessor.fit_transform(X)

    X_train, X_test, Y_train, Y_test = train_test_split(X_transformed, Y, test_size=0.30, random_state=42)

    model = RandomForestClassifier()
    model.fit(X_train, Y_train)

    dump(preprocessor, 'IA/models/preprocessor.joblib')
    dump(model, 'IA/models/model.joblib')

    train_predictions = model.predict(X_train)
    test_predictions = model.predict(X_test)

    print(f"Precisão no conjunto de treinamento: {precision_score(Y_train, train_predictions, average='weighted'):.2f}")
    print(f"Precisão no conjunto de teste: {precision_score(Y_test, test_predictions, average='weighted'):.2f}")

    Ypred = model.predict(X_transformed)
    plt.plot(Y.reset_index(drop=True), label='True Labels')
    plt.plot(Ypred, label='Predicted Labels')
    plt.legend()
    plt.show()

except FileNotFoundError:
    print(f"O arquivo {file_path} não foi encontrado. Verifique o caminho e tente novamente.")
except Exception as e:
    print(f"Ocorreu um erro: {e}")
