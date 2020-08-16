# -*- coding: cp1252 -*-
import os


allowedExtendsions = [".js", ".jsx", ".ts", ".tsx"]
def fileList():

    matches=[]
    for root, dirnames, filenames in os.walk(os.getcwd()):

        if "node_modules" in root:
            continue
        
        for filename in filenames:

            extension = os.path.splitext(filename)[1]
            if extension in allowedExtendsions:
                matches.append(os.path.join(root, filename))

    return matches


files=fileList()

def grabURLs(word):

    for myfile in files:

        fin=open(myfile, "r", encoding="utf-8", errors='replace')
        data=fin.read()
        fin.close()

        if word in data:
            print(myfile)



word = input("Enter string: ")

grabURLs(word)


