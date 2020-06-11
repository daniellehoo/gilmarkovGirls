import bs4
"""
import urllib.request
url = "https://en.wikipedia.org/wiki/List_of_Gilmore_Girls_episodes"
page = urllib.request.urlopen(url)
from bs4 import BeautifulSoup
soup = BeautifulSoup(page, "lxml")
#print(soup.prettify())
#print(soup.title.string, "\n")

A = []

for right_table in soup.find_all(class_='summary'):
    if right_table.find('a') == None:
        cells = right_table.find(text = True)
        cells = cells.strip('"')
    else:
        cells = right_table.find('a').contents[0]
    A.append(cells)

print(A)
"""