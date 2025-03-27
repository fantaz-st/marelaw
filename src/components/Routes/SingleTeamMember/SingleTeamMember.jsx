import { Box, Grid, Typography } from "@mui/material";
import classes from "./SingleTeamMember.module.css";
import Link from "next/link";
import Image from "next/image";
import MuiMarkdown from "mui-markdown";

const SingleTeamMember = ({ content, metaData }) => {
  console.log(metaData);
  return (
    <Box className={classes.container} maxWidth='xl'>
      <Box className={classes.inner}>
        <Grid container className={classes.teamMember} spacing={3}>
          <Grid item xs={12} md={4}>
            <Box className={classes.imageContainer}>
              <Image src={metaData.photo} alt={metaData.title} fill sizes='(max-width: 768px) 100vw, 33vw' />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant='body' component='p' className={classes.breadCrumb}>
              <Link href='/' style={{ marginRight: "0.35rem", color: "#5790e1" }}>
                HOME
              </Link>
              /
              <Link href='/team' style={{ margin: "0 0.35rem", color: "#5790e1" }}>
                TEAM
              </Link>
              /<span style={{ marginLeft: "0.35rem" }}>{metaData.breadCrumb}</span>
            </Typography>
            <Typography variant='h1' className={classes.title}>
              {metaData.title}
            </Typography>
            <Typography variant='subtitle1'>{metaData.role}</Typography>
            <Box className={classes.content}>
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SingleTeamMember;
