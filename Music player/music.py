from turtle import title
from flask import Flask , request , jsonify , render_template
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

df = pd.read_csv("C:\Users\arnaj\OneDrive\Desktop\ML\genres_v2.csv")
df.head(3)

df.shape

columns = ['Title','Artist','Top Genre']



df[columns].head(3)

df[columns].isnull().values.any()


def get_important_features(data):
    important_features =[]
    for i in range(0,data.shapes[0]):
        important_features.append(data['Title'][i]+' '+data['Artist'][i]+' '+data['Top Genre'][i])
    return important_features

df['important_features'] = get_important_features(df)

df.head(5)

cm = CountVectorizer().fit_transform(df['important_features'])

cs = cosine_similarity(cm)

cs.shape

app=Flask(__name__)
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/fill',methods=['POST','GET'])
def fill():
    if request.method == "POST":
        var = request.form['formGroupExampleInput9']
    def predict(tittle):
        song_id = df[df.Title== title]['Index'].values[0]
        scores = list(enumerate(cs[song_id]))
        sorted_scores = sorted(scores,key=lambda x:x[1],reverse=True)
        sorted_scores=sorted_scores[1:]
        j=0
        k=[]
        for item in sorted_scores:
            song_title = df[df.Index == item[0]]['Title'].values[0]
            q=(song_title)
            k.append(q)
            j=j+1
            if j>6:
                break;
        return k
    data = predict(var)
    return render_template('home.html',data=data,f=var)

if __name__=="__main__":
    app.run(debug=True)