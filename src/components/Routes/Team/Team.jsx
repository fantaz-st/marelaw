import { Box, Button, Typography } from "@mui/material";
import classes from "./Team.module.css";
import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const Team = (props) => {
  return (
    <Box as='article' className={classes.container} maxWidth='xl'>
      <Box className={classes.inner}>
        <Box className={classes.members}>
          <Typography variant='h1' className={classes.title}>
            Team Members
          </Typography>
          {props.team.map((member) => (
            <Link href={`/team/${member.slug}`} key={member.slug} className={classes.member}>
              <Typography variant='h5' className={classes.title}>
                {member.title}
              </Typography>
              <Button className={classes.button} sx={{ display: { xs: "none", md: "block" } }}>
                <ArrowOutwardIcon />
              </Button>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
