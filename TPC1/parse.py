import xml.etree.ElementTree

#Básicos da utilização da lib
# tree = xml.etree.ElementTree.parse('./MapaRuas-materialBase/texto/MRB-01-RuaDoCampo.xml')
# root = tree.getroot()

# print(root[0]) #imprime o primeiro filho
# for tag in root[1][0]: #para todas as tags
#     print (tag.tag,tag.attrib) #imprime a tag e os atributos (em dicionário)
    
# for x in root[0]:
#     print(x.text) #imprime o texto
    
# for x in root[1].findall('figura'): #seleciona os elementos figura do segundo filho de root
#     print (x.find('legenda').text)