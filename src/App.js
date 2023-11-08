import "./App.css";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import "moment/min/locales";

import SelectBox from "./components/SelectBox.js";
moment.locale("en");

let cancel;

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"].join(","),
  },
});

function App() {
  // States
  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("en");
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState("egypt");
  const [coordinate, setCoordinate] = useState({
    lat: 0,
    lon: 0,
  });

  const [temp, setTemp] = useState({
    number: 0,
    min: 0,
    max: 0,
    description: "",
    icon: "",
  });

  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY"));
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=0a785a6f81cf69c647652dbd61b4068b`,
        {
          cancelToken: new axios.CancelToken(function (c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const tempRes = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        setTemp({
          number: tempRes,
          min,
          max,
          description,
          icon,
        });
      })
      .catch(function () {
        // handle error
        // console.log(error);
      });

    // Cleanup
    return () => {
      cancel();
    };
  }, [coordinate.lat, coordinate.lon]);

  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  // Event Handlers
  function handleChangeLanguage() {
    if (locale === "en") {
      setLocale("ar");
      moment.locale("ar");
      i18n.changeLanguage("ar");
    } else {
      setLocale("en");
      moment.locale("en");
      i18n.changeLanguage("en");
    }

    setDateAndTime(moment().format("MMMM Do YYYY"));
  }

  const handleChange = (event) => {
    setCountry(event.target.value);
    if (event.target.value === "egypt") {
      setCoordinate({
        lat: 30.03,
        lon: 31.2,
      });
    } else if (event.target.value === "jordan") {
      setCoordinate({
        lat: 30.5,
        lon: 36.2,
      });
    } else if (event.target.value === "usa") {
      setCoordinate({
        lat: 40.7,
        lon: -73.9,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className={`App ${i18n.language === "en" ? "en-lang" : "ar-lang"}`}
        style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
      >
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              display: "flex",
              margin: "50px 0",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              style={{
                width: "100%",
                background: "rgba(28, 52, 91, 0.8)",
                color: "white",
                padding: "40px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                    gap: "20px",
                  }}
                >
                  <Typography
                    variant="h3"
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {t(country)}
                  </Typography>

                  <Typography variant="h5">{dateAndTime}</Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      <img
                        src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                        alt="weather state"
                      />
                    </div>
                    {/*== TEMP ==*/}

                    <Typography variant="h6">{t(temp.description)}</Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}: {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 20px" }}>|</h5>
                      <h5>
                        {t("max")}: {temp.max}
                      </h5>
                    </div>
                  </div>
                  {/*== DEGREE & DESCRIPTION ==*/}

                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
                {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
              </div>
              {/* == CONTENT == */}
            </div>
            {/*== CARD ==*/}

            {/* TRANSLATION CONTAINER */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              <Button
                style={{ color: "#3f51b5", fontWeight: "bold" }}
                variant="text"
                onClick={handleChangeLanguage}
              >
                {locale === "en" ? "Arabic" : "انجليزي"}
              </Button>
            </div>
            {/*== TRANSLATION CONTAINER ==*/}
          </div>
          {/*== CONTENT CONTAINER ==*/}

          <SelectBox country={country} handleChange={handleChange} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
