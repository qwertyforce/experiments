from bs4 import BeautifulSoup
import requests
import csv

ids = []

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
    
    status_info = page_soup.find("td", { "id" : "StatusR" })
    status_info = str(status_info).replace("\n","").replace("\t","").replace('<td id="StatusR">',"").replace("</td>","").split("<br/>")

    column_1_p = page_soup.find("table", { "id" : "bib" }).find("td").find_all("p")
    arr_q1=["(21)(22) Заявка:","(45) Опубликовано:","Адрес для переписки:"]
    arr_data1 = magic_parse(column_1_p,arr_q1)
    # print(arr_data1)

    column_2_p = page_soup.find("td", { "id" : "bibl" })
    arr_q2=["(71) Заявитель(и):","(72) Автор(ы):","(73) Патентообладатель(и):"]
    arr_data2 = magic_parse(column_2_p,arr_q2)
    # print(arr_data2)

    p_text_54 = page_soup.find("p", {"id":"B542"}).find("b").getText().strip()
    # print(p_text_54)
    main_txt = page_soup.find("div", {"id":"Abs"}).getText().strip()
    izv_text = page_soup.find("p", {"class":"NameIzv"})
    if izv_text is None:
        izv_text = "нет информации"
        
    else:
        izv_text=izv_text.getText().strip()

    return status_info + arr_data1 + arr_data2 + [p_text_54,main_txt,izv_text]
from time import sleep
# with open('test2.html',encoding="cp1251") as f:
#     lines = f.read()
#     parse(lines)
with open('fips_data.csv', 'w', newline='',encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile,delimiter='|')
        writer.writerow(["Номер","Статус", "Пошлина", "Заявка", "Опубликовано", "Адрес для переписки", "Заявитель(и)", "Автор(ы)", "Патентообладатель(и)","Название", "Текст", "Извещение"])
        for id in ids:
            print(id)
            page_text = requests.get(f"https://new.fips.ru/registers-doc-view/fips_servlet?DB=RUPM&DocNumber={id}&TypeFile=html").text
            res = parse(page_text)
            res.insert(0,id)
            writer.writerow(res)
            sleep(5)
