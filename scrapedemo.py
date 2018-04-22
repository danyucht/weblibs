# import libraries
import urllib2
from bs4 import BeautifulSoup as BS
import nltk.tokenize as token
from nltk import pos_tag
from random import choice
from json import JSONEncoder



#url
qpage = 'https://www.bloomberg.com/news/articles/2018-04-21/weekend-reads-from-balance-of-power'
reltags = """CD JJ JJR JJS
    NN NNS NNP NNPS
    RB
    VB VBZ VBD """
    

def pickwords(url):
    # query website and return html to varialbe page
    page = urllib2.urlopen(url)

    # parse the html using beautiful soup and store in variable `soup`
    soup = BS(page, 'html.parser')
    paragraphs = soup.find_all('p')
    pars = []
    pos_list = []
    numwords = 0
    print paragraphs
    for p in paragraphs:
        print p
        pars.append(p.contents[0])
    print pars
    for i in pars:
        i = i.encode('utf-8')#.strip()
        pos = token.word_tokenize(i.decode('utf-8'))
        numwords += len(pos)
        pos = pos_tag(pos)
        pos_list.append(pos)
    
    #print "number of words is %d" %(numwords)
    madwords = int(numwords/10)
    #print "madwords is %d" %(madwords)
    
  
    replace = []
    for i in range(madwords):
        a = choice(pos_list)
        while(not (a) or not (a[0][0].isalpha())):
            a = choice(pos_list)
        b = choice(a)
        while (reltags.find(b[1]) == -1 or not (b[0].isalpha) or not(b[0].find('\u')==-1) or (len(b[0]) ==1)):
            b = choice(a)
        replace.append(b)
        #print b
    #print replace
    
    return writejson(replace)
    
def writejson(reps):
    my_json = { }
    
    for i in reps:
            my_json[i[0]] = i[1]
            print(i)
    return my_json
    
    # js = []
    # jsonen = JSONEncoder()
    # for a in jsonen.iterencode(reps):
        # print a
    #return a
    # for i in reps:
        # a = jsonen.encode(i)
        # js.append(a)
    # json = jsonen.encode(js)
    # return json
    # json = {}
    # with open('names.json', 'w+') as names:
        # names.write('{"replacewords":{\n')
        # for i in range(len(reps) -1):
            # thestring = '"{}" : "{}",'.format(reps[i][0], reps[i][1])
            # names.write(thestring+ "\n")
        # thestring = '"{}" : "{}"\n'.format(reps[-1][0], reps[-1][1])
        # names.write(thestring)
        # names.write("}}")
        
#pickwords(qpage)