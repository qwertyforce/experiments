from bs4 import BeautifulSoup
import requests
import csv

ids=[]

def magic_parse(p_elements,query_arr):
    arr_data = len(query_arr)*["нет информации"]
    for x in p_elements:
        text = x.getText().strip()
        for i, q in enumerate(query_arr):
            if q in text:
                arr_data[i]=text[text.index(q)+len(q):].strip()
                break
            elif q == "Авторы:":
                q = "Автор:"
                if q in text:
                    arr_data[i]=text[text.index(q)+len(q):].strip()
                    break

    return arr_data

def parse(html_text):
    page_soup = BeautifulSoup(html_text, 'html.parser')

    column_1_p = page_soup.find("table", { "id" : "bib" }).find("td").find_all("p")
    arr_q1=["Дата регистрации:","Номер и дата поступления заявки:","Дата публикации:"]
    arr_data1 = magic_parse(column_1_p,arr_q1)

    column_2_p = page_soup.find("td", { "id" : "bibl" })
    arr_q2=["Авторы:","Правообладатель:"]
    arr_data2 = magic_parse(column_2_p,arr_q2)

    bottom_text_p = page_soup.find_all("p", class_="TitAbs")
    arr_q3=["Название программы для ЭВМ:","Реферат:","Язык программирования:","Объем программы для ЭВМ:"]
    arr_data3 = magic_parse(bottom_text_p,arr_q3)

    return arr_data1 + arr_data2 + arr_data3   

from time import sleep
with open('fips_data.csv', 'w', newline='',encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile,delimiter='|')
        writer.writerow(["Номер регистрации","Дата регистрации","Номер и дата поступления заявки","Дата публикации","Авторы","Правообладатель","Название программы для ЭВМ","Реферат","Язык программирования","Объем программы для ЭВМ"])
        for id in ids:
            print(id)
            page_text = requests.get(f"https://www1.fips.ru/fips_servl/fips_servlet?DB=EVM&DocNumber={id}&TypeFile=html").text
            res = parse(page_text)
            res.insert(0,id)
            writer.writerow(res)
            sleep(5)
