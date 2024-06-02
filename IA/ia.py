import pandas as pd
import matplotlib.pyplot as plt
import os

from warnings import simplefilter


simplefilter(action="ignore", category=pd.errors.PerformanceWarning)

file_path = 'IA/DataSet/RenaultData.xlsm'

if os.path.exists(file_path):
    print(f"O arquivo {file_path} foi encontrado.")
else:
    print(f"O arquivo {file_path} NÃO foi encontrado.")

try:
    df = pd.read_excel(file_path, header=4, usecols="C:AF", sheet_name="List of risks")
    
    df.drop(
        ['Risco', 'Tipo de risco', 'Data de entrada do risco', 'Metier', 'Ação', 'Nome do Piloto', "ID do Piloto", "Início do Plano de Ação", "Data de Alerta", "Tempo de Resolução", "Hora", "Comentários", "Data de Resolução", "Status", "Capitalização"],
        axis = 1,
        inplace = True
    )

    df.dropna()

    print("Nomes das colunas:")
    print(df.columns)

    ##########################

    #########################

except FileNotFoundError:
    print(f"O arquivo {file_path} não foi encontrado. Verifique o caminho e tente novamente.")
except Exception as e:
    print(f"Ocorreu um erro: {e}")


# df.drop(
#     ['id', 'created_at', 'white_id', 'black_id', 'increment_code', 'opening_eco', "last_move_at", "rated", "opening_name", "black_rating", "opening_ply"],
#     axis = 1,
#     inplace = True
# )

# le = LabelEncoder()

# print("Comecou!!")

# df['moves'] = df["moves"].str.split()
# moves = df['moves']
# i = 0

# for sublist in moves:
#     moves = sublist[0: 10: 2]
#     for item in sublist:
#         if item in df.loc[i, 'moves']:
#             df.loc[i, item] = 1
#     i += 2
#     if i > 20056:
#         print("Terminou!!")
#         break
# df = df.fillna((int)(0))

# df.drop(
#     [ 'moves'],
#     axis = 1,
#     inplace = True
# )

# df['victory_status'] = le.fit_transform(df['victory_status'])
# df['winner'] = le.fit_transform(df['winner'])
# print(le.classes_)

# Y = df['winner']
# X = df

# X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=42)

# model = MiniBatchKMeans(n_clusters=6,
#                         random_state=42,
#                         batch_size=20,
#                         max_iter=500,
#                         n_init="auto")
# model.fit(X_train, X_test)
# dump(model, 'chess.pkl')

# preds = model.predict(X)
# df['cluster'] = preds

# data = list(zip(preds, Y, df['d4'].values.tolist()))


# plt.figure(figsize=(10, 8))
# sns.set_theme(style="ticks")
# sns.pairplot(df.sample(1000), vars=df.columns[0:8], hue='cluster', palette='viridis')
# plt.suptitle('Matriz de Dispersão (Scatter Matrix) para as primeiras 5 variáveis', y=1.02)
# plt.show()