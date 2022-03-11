import * as React from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";
import { List, Button, FAB, Divider, Modal } from "react-native-paper";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import WorkdayRepository from "../../database/repositories/WorkdayRepository";
import ModalConfirmation from "../../components/ModalConfirmation";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function WorkdayCalendarScreen({ navigation }) {
  const localDb = LocalDatabase.getInstance();
  const workdayRepository = new WorkdayRepository(localDb.dbConnection);

  const [markedDates, setMarkedDates] = React.useState<{
    [key: string]: {
      marked?: boolean;
      selected?: boolean;
      selectedColor?: string;
      dotColor?: string;
      disabled?: boolean;
      activeOpacity?: number;
      disableTouchEvent?: boolean;
    };
  }>({
    "2022-03-02": { selected: true, marked: true, selectedColor: "blue" },
    "2022-03-07": { marked: true },
    "2022-03-13": { marked: true, dotColor: "red", activeOpacity: 0 },
    "2022-03-11": { disabled: true, disableTouchEvent: true },
  });

  function gotoDay(day: Date) {
    console.log("selected day", day.toISOString());
    // TODO find day if doesntexist dont do anything else navigation.navigate("Workday", params: {workdayId: 0})
  }

  function changeMarked() {
    setMarkedDates({
      "2022-03-03": { selected: true, marked: true, selectedColor: "blue" },
      "2022-03-08": { marked: true },
      "2022-03-22": { marked: true, dotColor: "red", activeOpacity: 0 },
      "2022-03-11": { disabled: true, disableTouchEvent: true },
    });
  }
  function viewMarked() {
    console.log(markedDates);
  }

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          gotoDay(new Date(day.timestamp));
        }}
        onDayLongPress={(day) => {
          // TODO if doesnt exist create new day
          console.log("longprees");
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          // TODO rerender calendar with this month
          console.log("month changed", month);
        }}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        //renderHeader={(date) => {
        /*Return JSX*/
        //}}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        markedDates={markedDates}
      />
      <Button onPress={changeMarked} mode="contained">
        Zmien
      </Button>
      <Button onPress={viewMarked} mode="contained">
        view
      </Button>
    </View>
  );
}
