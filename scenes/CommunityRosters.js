import React from "react";
import { ScrollView, View, Text, Image, ActivityIndicator } from "react-native";
import { Actions } from "react-native-router-flux";
import { communityRosters, getDataFromLink } from "../data/script";
import Background from "../components/background";
import CommunityRosterListItem from "../components/CommunityRosterListItem";
import Button from "../components/Button";

const URL = "https://onpapersports.com/roster/all/basketball/";
const DOWNLOAD = "https://onpapersports.com/roster/download/";

export default class CommunityRosters extends React.Component {
  componentDidMount = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          filteredList: this.filterList(json.rosters),
          loading: false,
        });
      });
  };

  leaveScene = () => {
    //   console.log('called');
    if (this.props.filtered != null) {
      Actions.pop();
    } else {
      this.props.update(() => {
        Actions.popTo("mainmenu");
      });
    }
  };

  filterList(array) {
    if (this.props.filtered != null) {
      let filtered = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].type === this.props.filtered) {
          filtered.push(array[i]);
        }
      }
      return filtered.sort((a,b) => {
          if(a.downloads < b.downloads) return 1;
          if(a.downloads > b.downloads) return -1;
          return 0;
      });
    } else {
      return array.sort((a,b) => {
        if(a.downloads < b.downloads) return 1;
        if(a.downloads > b.downloads) return -1;
        return 0;
    });
    }
  }

  state = {
    filteredList: null,
    loading: true,
  };

  render() {
    return (
      <Background>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0)",
            borderBottomWidth: 1,
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              height: 50,
              alignSelf: "center",
              margin: 5,
            }}
            source={require("../assets/icon.png")}
          />
          <Text
            style={{
              fontFamily: "advent-pro",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {"Community Rosters"}
          </Text>
          <Text
            style={{
              fontFamily: "advent-pro",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            {"Note: These are free rosters created by the community"}
          </Text>
        </View>
        {this.state.loading ? (
          <View
            style={{
              height: "60%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"}></ActivityIndicator>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {this.state.filteredList == null
              ? null
              : this.state.filteredList.length > 0
              ? this.state.filteredList.map((item, i) => (
                  <CommunityRosterListItem
                    titleStyle={{ fontFamily: "advent-pro", color: "black" }}
                    subtitleStyle={{ fontFamily: "advent-pro", color: "black" }}
                    containerStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
                    onPress={() => {
                      getDataFromLink(
                        DOWNLOAD + item._id,
                        item.type,
                        item.sliderType,
                        this.leaveScene
                      );
                    }}
                    title={item.name + " (" + item.type.toUpperCase() + ")"}
                    subtitle={`Created By: ${item.userName}`}
                    rightTitleStyle={{ fontFamily: "advent-pro" }}
                    rightTitle={`Downloads: ${item.downloads}`}
                    rightSubtitle={`Updates: ${item.updates}`}
                    key={i}
                  ></CommunityRosterListItem>
                ))
              : null}
          </ScrollView>
        )}

        {this.state.loading ? null : (
          <Button
            title={"Upload A Roster"}
            color={"rgba(255,0,0,.75)"}
            textColor={"white"}
            style={{ padding: 25 }}
            onPress={() => {
              Actions.replace("login");
            }}
          ></Button>
        )}
      </Background>
    );
  }
}
