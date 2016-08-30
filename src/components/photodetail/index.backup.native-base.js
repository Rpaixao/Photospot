import React, { Component } from 'react';
import ReactNative, { View, Image } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, List, ListItem, CheckBox,
InputGroup,
Icon,
Input,
Badge,
Tabs } from 'native-base';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import Dimensions from 'Dimensions';
let windowWidth = Dimensions.get('window').width;


var FestaDetail = React.createClass({
  onPressBackEvent(){
      this.props.navigator.pop();
  },
  render() {
     return (
         <Container>

             <Header>
             <Button transparent onPress={this.onPressBackEvent}>
                 <Text>Voltar</Text>
             </Button>

              <Title>Baixa da Banheira</Title>

              <Button transparent>
                  <Text>Info</Text>
              </Button>
             </Header>

              <Content>
              <Tabs>
                    <View key='info' style={{width: windowWidth}}>
                   <Card tabLabel="Informações">
                       <CardItem style={{width: windowWidth}}>
                           <Thumbnail source={require('./bxb.png')} />
                           <Text>Festa S. José Operário</Text>
                           <Text note>6 de Julho a 10 de Julho</Text>
                       </CardItem>

                       <CardItem>
                           <Text>
                           A área que hoje ocupa era outrora denominada pelo nome dos proprietários das quintas que a retalhavam (ex. "Quinta dos Algarvios"), pelos seus acidentes geográficos (ex. "Baixa da Serra", “Alto da Serra”) ou até por outras particularidades que ao sabor do tempo foram caindo no esquecimento.
                           </Text>
                       </CardItem>
                      <CardItem>
                          <Text>Localização</Text>
                          <Text note>Centro</Text>
                      </CardItem>

                      <CardItem>
                          <Image style={{width: windowWidth-1}} source={require('./map2.gif')} />
                      </CardItem>

                      <CardItem>
                           <Text>Ver Mapa</Text>
                       </CardItem>

                 </Card>
                 </View>
                 <View key='prog' style={{width: windowWidth}}>
                 <List tabLabel="Programação">
                   <ListItem itemDivider>
                          <Text>6 Julho</Text>
                      </ListItem>
                      <ListItem >
                          <Text>20:00 - Abertura das Festas</Text>
                      </ListItem>
                      <ListItem >
                          <Text>21:00 - Apresentação da Brigada da Terra</Text>
                      </ListItem>
                      <ListItem itemDivider>
                          <Text>7 Julho</Text>
                      </ListItem>
                      <ListItem>
                          <Text>21:00 - Moços da Aldeia</Text>
                      </ListItem>
                      <ListItem>
                          <Text>22:30 - Cruzados</Text>
                      </ListItem>
                      <ListItem itemDivider>
                          <Text>8 Julho</Text>
                      </ListItem>
                      <ListItem>
                          <Text>19:30 - Sunset Run Ribeirinho</Text>
                      </ListItem>
                      <ListItem>
                          <Text>22:30 - Noite de DJs com DJ Fox</Text>
                      </ListItem>
                  </List>
                  </View>
                 </Tabs>

               </Content>

         </Container>
     );
 }
});

module.exports = FestaDetail;
