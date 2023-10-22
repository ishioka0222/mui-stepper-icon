import CheckCircle from "@mui/icons-material/CheckCircle";
import Circle from "@mui/icons-material/Circle";
import Error from "@mui/icons-material/Error";
import HelpIcon from "@mui/icons-material/Help";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";
import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const stepIconRadius = 18;
const stepIconSize = stepIconRadius * 2;

interface Quiz {
  stepLabel: string;
  quiz: string;
  choices: string[];
  answerIndex: number;
}

const quizzes: Quiz[] = [
  {
    stepLabel: "国語",
    quiz: "「一期一会」の正しい意味は？",
    choices: ["一生に一度の出会い", "一年に一度"],
    answerIndex: 0,
  },
  {
    stepLabel: "数学",
    quiz: "1+1は？",
    choices: ["1", "2"],
    answerIndex: 1,
  },
  {
    stepLabel: "理科",
    quiz: "水は何でできている？",
    choices: ["水素と酸素", "水素と窒素"],
    answerIndex: 0,
  },
  {
    stepLabel: "社会",
    quiz: "日本で一番高い山は？",
    choices: ["富士山", "エベレスト"],
    answerIndex: 0,
  },
  {
    stepLabel: "英語",
    quiz: "「りんご」は英語で？",
    choices: ["Orange ", "Apple"],
    answerIndex: 1,
  },
];

type QuizState = "unanswered" | "correct" | "wrong" | "passed";

interface CustomStepIconProps extends StepIconProps {
  state: QuizState;
}

const CustomStepIcon = (props: CustomStepIconProps) => {
  let Icon;
  switch (props.state) {
    case "unanswered":
      Icon = Circle;
      break;
    case "correct":
      Icon = CheckCircle;
      break;
    case "wrong":
      Icon = Error;
      break;
    case "passed":
      Icon = NextPlanIcon;
      break;
  }

  return (
    <Box>
      <Icon
        sx={{
          width: stepIconSize,
          height: stepIconSize,
          ...(props.state === "unanswered" && {
            color: (theme) => theme.palette.text.disabled,
          }),
          ...(props.state === "correct" && {
            color: (theme) => theme.palette.success.main,
          }),
          ...(props.state === "wrong" && {
            color: (theme) => theme.palette.error.main,
          }),
          ...(props.state === "passed" && {
            color: (theme) => theme.palette.warning.main,
          }),
        }}
      />
      {props.state === "unanswered" && (
        <Typography
          sx={{
            position: "absolute",
            top: 0,
            width: stepIconSize,
            height: stepIconSize,
            textAlign: "center",
            lineHeight: `${stepIconSize}px`,
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.text.disabled),
          }}
        >
          {props.icon}
        </Typography>
      )}
    </Box>
  );
};

const quizStateIconCommonStyle: SxProps<Theme> = {
  width: "25%",
  height: "auto",
  display: "flex",
  margin: "0 auto",
};

function App() {
  const [activeQuizIndex, setActiveQuizIndex] = useState(-1);
  const [quizStates, setQuizStates] = useState<QuizState[]>([]);
  const [currentQuizState, setCurrentQuizState] =
    useState<QuizState>("unanswered");

  const handleStartButtonClick = () => {
    setActiveQuizIndex(0);
    setQuizStates([]);
    setCurrentQuizState("unanswered");
  };

  const handleAnswerButtonClick = (answerIndex: number) => {
    let newQuizState: QuizState;
    if (quizzes[activeQuizIndex].answerIndex === answerIndex) {
      newQuizState = "correct";
    } else {
      newQuizState = "wrong";
    }
    setCurrentQuizState(newQuizState);
    setQuizStates((prev) => [...prev, newQuizState]);
  };

  const handlePassButtonClick = () => {
    const newQuizState = "passed";
    setCurrentQuizState(newQuizState);
    setQuizStates((prev) => [...prev, newQuizState]);
  };

  const handleNextButtonClick = () => {
    setActiveQuizIndex((prev) => prev + 1);
    setCurrentQuizState("unanswered");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          overflow: "auto",
          p: 4,
          bgcolor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            p: 4,
            bgcolor: "background.paper",
          }}
        >
          <Grid container columnSpacing={2} rowSpacing={4}>
            <Grid item xs={12}>
              <Stepper
                activeStep={activeQuizIndex}
                alternativeLabel
                sx={{
                  "& .MuiStepConnector-root": {
                    top: stepIconRadius,
                  },
                }}
              >
                {Array.from({ length: quizzes.length }).map((_, index) => (
                  <Step key={index}>
                    <StepLabel
                      StepIconComponent={(props) => (
                        <CustomStepIcon
                          {...props}
                          state={quizStates[index] ?? "unanswered"}
                        />
                      )}
                    >
                      {quizzes[index].stepLabel}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            {activeQuizIndex < 0 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h1" align="center">
                    クイズアプリ
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleStartButtonClick}
                  >
                    スタート
                  </Button>
                </Grid>
              </>
            )}
            {0 <= activeQuizIndex && activeQuizIndex < quizzes.length && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h1" align="center">
                    {quizzes[activeQuizIndex]?.quiz}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {currentQuizState === "unanswered" && (
                    <HelpIcon
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        ...quizStateIconCommonStyle,
                      }}
                    />
                  )}
                  {currentQuizState === "correct" && (
                    <CheckCircle
                      sx={{
                        color: (theme) => theme.palette.success.main,
                        ...quizStateIconCommonStyle,
                      }}
                    />
                  )}
                  {currentQuizState === "wrong" && (
                    <Error
                      sx={{
                        color: (theme) => theme.palette.error.main,
                        ...quizStateIconCommonStyle,
                      }}
                    />
                  )}
                  {currentQuizState === "passed" && (
                    <NextPlanIcon
                      sx={{
                        color: (theme) => theme.palette.warning.main,
                        ...quizStateIconCommonStyle,
                      }}
                    />
                  )}
                </Grid>
                {quizzes[activeQuizIndex].choices.map((choice, index) => (
                  <Grid key={index} item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={currentQuizState !== "unanswered"}
                      onClick={() => handleAnswerButtonClick(index)}
                      sx={{
                        "&.Mui-disabled": {
                          ...(quizzes[activeQuizIndex].answerIndex ===
                            index && {
                            background: (theme) => theme.palette.success.main,
                            color: (theme) =>
                              theme.palette.success.contrastText,
                          }),
                          ...(quizzes[activeQuizIndex].answerIndex !==
                            index && {
                            background: (theme) => theme.palette.error.main,
                            color: (theme) => theme.palette.error.contrastText,
                          }),
                        },
                      }}
                    >
                      {choice}
                    </Button>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={currentQuizState !== "unanswered"}
                    startIcon={<SearchIcon />}
                    onClick={handlePassButtonClick}
                  >
                    答えを見る
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={currentQuizState === "unanswered"}
                    sx={{
                      float: "right",
                    }}
                    startIcon={<PlayArrowIcon />}
                    onClick={handleNextButtonClick}
                  >
                    次の問題へ
                  </Button>
                </Grid>
              </>
            )}
            {activeQuizIndex >= quizzes.length && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h1" align="center">
                    結果発表
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" component="h2" align="center">
                    {quizzes.length}問中
                    {quizStates.filter((state) => state === "correct").length}
                    問正解
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleStartButtonClick}
                  >
                    もう一度
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default App;
