from lxml import etree
import os

def validate_xml(xml, xsd):
    xsd_file = etree.parse(xsd)
    schema = etree.XMLSchema(xsd_file)
    
    xml_file = etree.parse(xml)

    if schema.validate(xml_file):
        print(f"{xml}: XML Document is valid, according to XSD")
    else:
        print(f"{xml}: XML Document is not valid")
        print(schema.error_log)

def validate_all_xml(dir, xsd):
    for file in os.listdir(dir):
        if file.endswith(".xml"):
            full_path = os.path.join(dir, file)
            validate_xml(full_path, xsd)

validate_all_xml('C:/Users/Utilizador/Desktop/UM/EngWeb2024/TPC1/MapaRuas-materialBase/texto', 'C:/Users/Utilizador/Desktop/UM/EngWeb2024/TPC1/MapaRuas-materialBase/MRB-rua.xsd')