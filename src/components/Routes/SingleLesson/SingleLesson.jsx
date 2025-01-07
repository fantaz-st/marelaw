"use client";

import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { Box, Typography, List, ListItem, Button, Alert, Grid, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import classes from "./SingleLesson.module.css";
import { MuiMarkdown } from "mui-markdown";
import Link from "next/link";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import ImgComponent from "./ImgComponent";

const ListItemTypo = (props) => {
  return (
    <ListItem className='list-item' variant='body' sx={{ display: "list-item", listStyleType: "disc" }}>
      <Typography variant='body'>{props.children}</Typography>
    </ListItem>
  );
};

gsap.registerPlugin(ScrollTrigger);
const SingleLesson = ({ content, metaData }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const containerRef = useRef(null);
  const quizRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#markdown-gallery",
      children: "a[data-lightbox-image]",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    const galleryLinks = document.querySelectorAll("#markdown-gallery a[data-lightbox-image]");
    galleryLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });

    return () => {
      lightbox.destroy();
      galleryLinks.forEach((link) => {
        link.removeEventListener("click", (e) => e.preventDefault());
      });
    };
  }, []);

  useLayoutEffect(() => {
    const title = titleRef.current;

    gsap.to(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 200",
        end: "+=100",
        scrub: true,
      },
      y: 0,
    });
  }, []);

  const { isSpeaking, isPaused, speak, pause } = useTextToSpeech();

  const handleReadContent = () => {
    if (isPaused) {
      speak("");
    } else if (isSpeaking) {
      pause();
    } else {
      const textToRead = `
        Title: ${metaData.read_title}.
        Estimated Hours: ${metaData.estimated_hours}.
        Learning Outcomes: ${metaData.learning_outcomes.join(", ")}.
        Content: ${content.replace(/<\/?[^>]+(>|$)/g, "")}.
        Definitions: ${metaData.definitions}.
      `;
      speak(textToRead);
    }
  };

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
    pause();
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

        <Box sx={{ display: { xs: "flex", md: "none" }, gap: "1rem" }}>
          <Button sx={{ padding: { xs: "0.5rem", md: "1rem" } }} className={classes.button} variant='contained' color={isSpeaking || isPaused ? "secondary" : "primary"} onClick={handleReadContent}>
            {isSpeaking ? (
              <span>
                <PauseCircleIcon /> Pause Read
              </span>
            ) : (
              <span>
                <PlayCircleIcon /> Read Aloud
              </span>
            )}
          </Button>
          <Button sx={{ padding: { xs: "0.5rem", md: "1rem" } }} variant='contained' color='primary' onClick={handleStartQuiz}>
            Take the Quiz
          </Button>
        </Box>
      </Box>
      <Grid container spacing={6} position='relative'>
        <Grid item xs={12} md={8} id='markdown-gallery'>
          {!showQuiz ? (
            <>
              {metaData.learning_outcomes && (
                <>
                  <Typography variant='h5' gutterBottom>
                    Learning Outcomes
                  </Typography>
                  <List sx={{ listStyleType: "disc", paddingLeft: "1.2rem" }}>
                    {metaData.learning_outcomes.map((outcome, index) => (
                      <ListItem key={index}>
                        <Typography variant='body'>{outcome}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              <MuiMarkdown
                overrides={{
                  ul: {
                    component: List,
                  },
                  li: {
                    component: ListItemTypo,
                  },
                  h1: {
                    component: Typography,
                    props: {
                      variant: "h1",
                    },
                  },
                  ol: {
                    component: List,
                    props: {
                      style: {
                        paddingLeft: "1.2rem",
                      },
                    },
                  },
                  /* li: {
                    component: ListItem,
                    props: {
                      variant: "body",
                      style: {
                        color: "#5B5B66",
                        display: "list-item",
                        listStyleType: "decimal",
                      },
                    },
                  }, */
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
                  img: {
                    component: ImgComponent,
                  },
                }}
              >
                {content}
              </MuiMarkdown>

              {metaData.links && (
                <div className={classes.links}>
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
                            <Typography component='span' variant='body'>
                              {link.split(match[0])[0]}
                              <Link href={url} target='_blank' rel='noopener noreferrer' style={{ textDecoration: "underline" }}>
                                {text}
                              </Link>
                              {link.split(match[0])[1]}
                            </Typography>
                          </ListItem>
                        );
                      }
                      return null;
                    })}
                  </List>
                </div>
              )}
              {metaData.literature && (
                <div className={classes.literature}>
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
                              {item.split(match[0])[0]}
                              <Link href={url} target='_blank' rel='noopener noreferrer' style={{ textDecoration: "underline" }}>
                                {text}
                              </Link>
                              {item.split(match[0])[1]}
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
                </div>
              )}
            </>
          ) : (
            <>
              <Typography variant='h5' gutterBottom ref={quizRef}>
                Reviewing questions
              </Typography>
              {metaData.quiz.map((q, index) => (
                <Box key={index} sx={{ marginBottom: 3 }}>
                  <Typography variant='body1'>
                    {index + 1}. {q.question}
                  </Typography>
                  <FormControl component='fieldset' sx={{ marginTop: 1 }}>
                    <RadioGroup name={`question-${index}`} onChange={(e) => handleAnswer(index, parseInt(e.target.value))}>
                      {q.options.map((option, i) => (
                        <FormControlLabel key={i} value={i} control={<Radio disabled={isSubmitted} />} label={option} />
                      ))}
                    </RadioGroup>
                  </FormControl>
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
        <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" } }}>
          <Box className={classes.sticky}>
            <Typography variant='h1' className={classes.title} sx={{ display: { xs: "none", md: "block" } }}>
              <span ref={titleRef}>{metaData.title}</span>
            </Typography>

            {!showQuiz && (
              <>
                <Button className={classes.button} variant='contained' color={isSpeaking || isPaused ? "secondary" : "primary"} onClick={handleReadContent} sx={{ marginTop: 2 }}>
                  {isSpeaking ? (
                    <span>
                      <PauseCircleIcon /> Pause Read
                    </span>
                  ) : (
                    <span>
                      <PlayCircleIcon /> Read Aloud
                    </span>
                  )}
                </Button>
                <Button variant='contained' color='primary' onClick={handleStartQuiz}>
                  Take the Quiz
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleLesson;
