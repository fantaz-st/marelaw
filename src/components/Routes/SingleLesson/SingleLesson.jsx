"use client";
import React, { useRef, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Radio, RadioGroup, FormControl, FormControlLabel, Button, Alert, Grid } from "@mui/material";
import classes from "./SingleLesson.module.css";

import { MuiMarkdown } from "mui-markdown";
import Link from "next/link";

const SingleLesson = ({ content, metaData }) => {
  //   console.log(metaData);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const containerRef = useRef(null);
  const quizRef = useRef(null);

  const handleAnswer = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    let incorrect = 0;

    metaData.quiz.forEach((q, index) => {
      if (answers[index] === q.correct_answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setIsSubmitted(true);
  };

  const handleStartQuiz = () => {
    setAnswers({});
    setIsSubmitted(false);
    setShowQuiz(true);
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackToLesson = () => {
    setShowQuiz(false);
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box className={classes.container} maxWidth='xl' ref={containerRef}>
      <Box className={classes.inner}>
        <Typography variant='body' component='p' className={classes.breadCrumb}>
          <Link href='/' style={{ marginRight: "0.35rem" }}>
            HOME
          </Link>
          /
          <Link href='/lessons' style={{ margin: "0 0.35rem" }}>
            LESSONS
          </Link>
          /<span style={{ marginLeft: "0.35rem" }}>{metaData.title}</span>
        </Typography>
        <Typography variant='h1' className={classes.title}>
          {metaData.title}
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          <strong>Estimated Hours:</strong> {metaData.estimated_hours}
        </Typography>
      </Box>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          {!showQuiz ? (
            <>
              <Typography variant='h5' gutterBottom>
                Learning Outcomes
              </Typography>
              <List sx={{ listStyleType: "disc" }}>
                {metaData.learning_outcomes.map((outcome, index) => (
                  <ListItem key={index}>
                    <Typography variant='body'>{outcome}</Typography>
                    {/* <ListItemText primary={outcome} /> */}
                  </ListItem>
                ))}
              </List>

              {/* <Typography variant='body1' dangerouslySetInnerHTML={{ __html: content }} sx={{ marginBottom: 4 }} /> */}

              {/* <ReactMarkdown className={`${classes.markdown}`}>{content}</ReactMarkdown> */}
              <MuiMarkdown
                overrides={{
                  h1: {
                    component: Typography,
                    props: {
                      variant: "h1",
                    },
                  },
                  p: {
                    component: Typography,
                    props: {
                      variant: "body",
                      style: {
                        display: "inline-block",
                        marginBottom: "1rem",
                      },
                    },
                  },
                }}
              >
                {content}
              </MuiMarkdown>
              <Typography variant='h5' gutterBottom>
                Links:
              </Typography>
              <List sx={{ listStyleType: "disc" }}>
                {metaData.links.map((link, index) => {
                  const match = link.match(/\[(.*)\]\((.*)\)/);
                  if (match) {
                    const [, text, url] = match;
                    return (
                      <ListItem key={index}>
                        <Link href={url} target='_blank' rel='noopener noreferrer'>
                          <Typography variant='body' sx={{ textDecoration: "underline" }}>
                            {text}
                          </Typography>
                        </Link>
                      </ListItem>
                    );
                  }
                  return null;
                })}
              </List>
              <Typography variant='h5' gutterBottom>
                Literature:
              </Typography>
              <List sx={{ listStyleType: "square" }}>
                {metaData.literature.map((item, index) => {
                  const match = item.match(/\[(.*)\]\((.*)\)/);
                  if (match) {
                    const [, text, url] = match;
                    return (
                      <ListItem key={index}>
                        <Typography component='span' variant='body'>
                          {item.split(match[0])[0]} {/* text before the link */}
                          <Link href={url} target='_blank' rel='noopener noreferrer' style={{ textDecoration: "underline" }}>
                            {text}
                          </Link>
                          {item.split(match[0])[1]} {/* Text after the link */}
                        </Typography>
                      </ListItem>
                    );
                  }
                  return (
                    <ListItem key={index}>
                      <Typography variant='body'>{item}</Typography>
                    </ListItem>
                  );
                })}
              </List>

              <Button variant='contained' color='primary' onClick={handleStartQuiz}>
                Take the Quiz
              </Button>
            </>
          ) : (
            <>
              <Typography variant='h5' gutterBottom ref={quizRef}>
                Reviewing questions
              </Typography>
              {metaData.quiz.map((q, index) => (
                <Box key={index} sx={{ marginBottom: 3 }}>
                  <Typography variant='body1'>{q.question}</Typography>
                  <FormControl component='fieldset' sx={{ marginTop: 1 }}>
                    <RadioGroup name={`question-${index}`} onChange={(e) => handleAnswer(index, parseInt(e.target.value))}>
                      {q.options.map((option, i) => (
                        <FormControlLabel key={i} value={i} control={<Radio disabled={isSubmitted} />} label={option} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {/* {isSubmitted && (
                <Alert severity={answers[index] === q.correct_answer ? "success" : "error"} sx={{ marginTop: 2 }}>
                  {answers[index] === q.correct_answer ? "Correct!" : `Incorrect. Correct answer: ${q.options[q.correct_answer]}`}
                </Alert>
              )} */}
                </Box>
              ))}

              {!isSubmitted && (
                <Button variant='contained' color='primary' onClick={handleSubmit} sx={{ marginTop: 2 }}>
                  Submit
                </Button>
              )}

              {isSubmitted && (
                <Box sx={{ marginTop: 3 }}>
                  <Typography variant='h6' gutterBottom>
                    Quiz Results
                  </Typography>
                  <Alert severity='success' sx={{ marginBottom: 2 }}>
                    Correct Answers: {correctCount}
                  </Alert>
                  <Alert severity='error' sx={{ marginBottom: 2 }}>
                    Incorrect Answers: {incorrectCount}
                  </Alert>

                  <Button variant='outlined' color='secondary' onClick={handleBackToLesson} sx={{ marginTop: 2 }}>
                    Back to Lesson
                  </Button>
                </Box>
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          All lessons
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleLesson;
