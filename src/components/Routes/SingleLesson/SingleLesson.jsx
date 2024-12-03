"use client";
import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Radio, RadioGroup, FormControl, FormControlLabel, Button, Alert } from "@mui/material";
import classes from "./SingleLesson.module.css";
import ReactMarkdown from "react-markdown";

import { getOverrides, MuiMarkdown } from "mui-markdown";

const SingleLesson = ({ content, metaData }) => {
  //   console.log(metaData);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleStartQuiz = () => {
    setAnswers({});
    setIsSubmitted(false);
    setShowQuiz(true);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}>
      {!showQuiz ? (
        <>
          <Typography variant='h1' className={classes.title} gutterBottom>
            {metaData.title}
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            <strong>Estimated Hours:</strong> {metaData.estimated_hours}
          </Typography>

          <Typography variant='h5' gutterBottom>
            Learning Outcomes
          </Typography>
          <List>
            {metaData.learning_outcomes.map((outcome, index) => (
              <ListItem key={index}>
                <ListItemText primary={outcome} />
              </ListItem>
            ))}
          </List>
          {/* <List>
            {metaData.links.map((link, index) => (
              <ListItem key={index}>
                <ListItemText primary={link} />
              </ListItem>
            ))}
          </List> */}

          {/* <Typography variant='body1' dangerouslySetInnerHTML={{ __html: content }} sx={{ marginBottom: 4 }} /> */}

          {/* <ReactMarkdown className={`${classes.markdown}`}>{content}</ReactMarkdown> */}
          <MuiMarkdown
            overrides={{
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
          <Button variant='contained' color='primary' onClick={handleStartQuiz}>
            Take the Quiz
          </Button>
        </>
      ) : (
        <>
          <Typography variant='h5' gutterBottom>
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
              {isSubmitted && (
                <Alert severity={answers[index] === q.correct_answer ? "success" : "error"} sx={{ marginTop: 2 }}>
                  {answers[index] === q.correct_answer ? "Correct!" : `Incorrect. Correct answer: ${q.options[q.correct_answer]}`}
                </Alert>
              )}
            </Box>
          ))}

          {!isSubmitted && (
            <Button variant='contained' color='primary' onClick={handleSubmit} sx={{ marginTop: 2 }}>
              Submit
            </Button>
          )}

          {isSubmitted && (
            <Button variant='outlined' color='secondary' onClick={() => setShowQuiz(false)} sx={{ marginTop: 2 }}>
              Back to Lesson
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default SingleLesson;
