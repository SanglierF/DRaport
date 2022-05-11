import * as React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import LocalDatabase from "../../database/LocalDatabase";

const localDb = LocalDatabase.getInstance();

export default function WorkdayCalendarScreen({ navigation }) {
  const [markedDates, setMarkedDates] = React.useState<{
    [key: string]: {
      marked?: boolean;
      color?: string;
      selected?: boolean;
      selectedColor?: string;
      dotColor?: string;
      disabled?: boolean;
      activeOpacity?: number;
      disableTouchEvent?: boolean;
    };
  }>({});

  const [changedMonth, setChangedMonth] = React.useState<{
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
  }>({
    dateString: new Date().toISOString().slice(0, 10),
    day: 1,
    month: 1,
    timestamp: 1,
    year: 1,
  }); // maybe extract to function with all fields correctly set
  const [workedDays, setWorkedDays] = React.useState([]);
  let disableLongPress = false;

  React.useEffect(() => {
    const month = changedMonth.dateString.slice(0, 7);
    localDb.workdayRepository
      .getAllInMonth(month)
      .then((found) => {
        setWorkedDays(found);
        changeMarked(found);
        return true;
      })
      .catch((error) => console.log(error));
  }, [changedMonth]);

  function gotoDay(day: string) {
    const existingDay = workedDays.find((found) => {
      return found.work_time_begin.toISOString().slice(0, 10) === day.slice(0, 10);
    });
    if (existingDay) {
      navigation.navigate("Workdays", {
        screen: "Workday",
        params: { workdayId: existingDay.id },
      });
    }
  }

  function changeMarked(workdays) {
    let markedDates = {};
    workdays.forEach((workday) => {
      const date = workday.work_time_begin.toISOString().slice(0, 10);
      markedDates[date] = { marked: true, selectedColor: "blue", selected: true };
    });
    //TODO maybe add disabled days to future days from now
    setMarkedDates(markedDates);
  }

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          gotoDay(day.dateString);
        }}
        onDayLongPress={(day) => {
          const existingDay = workedDays.find((found) => {
            return found.work_time_begin.toISOString().slice(0, 10) === day.dateString.slice(0, 10);
          });
          if (existingDay !== undefined) {
            localDb.workdayRepository
              .delete(existingDay.id)
              .then(() => {
                setChangedMonth(day);
                return true;
              })
              .catch((error) => console.log(error));
          } else {
            if (!disableLongPress) {
              disableLongPress = true;
              localDb.workdayRepository
                .save(
                  localDb.workdayRepository.create(
                    new Date(day.dateString.slice(0, 10)).toISOString()
                  )
                )
                .then(() => {
                  setChangedMonth(day);
                  disableLongPress = false;
                  return true;
                })
                .catch((error) => console.log(error));
            }
          }
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          // TODO rerender calendar with this month
          setChangedMonth(month);
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
    </View>
  );
}
