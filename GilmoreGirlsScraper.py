import bs4
import urllib.request
import json
url = "https://quotecatalog.com/communicator/lorelai-gilmore"
page = urllib.request.urlopen(url)
from bs4 import BeautifulSoup
soup = BeautifulSoup(page, "lxml")

A = []
for right_table in soup.find_all(class_='block p-5 font-serif md:text-lg quoteCard__blockquote'):
    cells = right_table.find(text = True)
    A.append(cells)

quotes = []
for el in A:
    el = el.strip("\n")
    el = el.strip("\t")
    el = el.replace('“', '')
    el = el.replace('”', '')
    if el != "'My God, I hate her.'":
        quotes.append(el)
quotes = "\\n".join(quotes)
print(quotes)