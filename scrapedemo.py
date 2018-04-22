# import libraries
import urllib2
from bs4 import BeautifulSoup as BS
import nltk.tokenize as token
from nltk import pos_tag
from random import choice


#url
qpage = 'https://www.bloomberg.com/news/articles/2018-04-20/treasury-10-year-yield-sets-2018-high-as-traders-focus-on-3'
reltags = """CD JJ JJR JJS
    NN NNS NNP NNPS
    RB
    VB VBZ VBD """
    

def pickwords(qpage):
    # query website and return html to varialbe page
    page = urllib2.urlopen(qpage)

    # parse the html using beautiful soup and store in variable `soup`
    soup = BS(page, 'html.parser')
    paragraphs = soup.find_all('p')
    pars = []
    pos_list = []
    numwords = 0
    for p in paragraphs:
        b = paragraphs[paragraphs.index(p)].has_attr('class')
        if not b:
            pars.append(p.contents[0])
    for i in pars:
        numwords += len(i.split())
        pos = token.word_tokenize(i)
        pos = pos_tag(pos)
        pos_list.append(pos)
    print "number of words is %d" %(numwords)
    madwords = int(numwords/10)
    print "madwords is %d" %(madwords)
    replace = []
    for i in range(madwords):
        a = choice(pos_list)
        b = choice(a)
        while (reltags.find(b[1]) == -1):
            b = choice(a)
        replace.append(b)
        print b
    #print replace
    return replace
    

        
pickwords(qpage)