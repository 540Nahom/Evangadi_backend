const {pool}= require("../Config/db")

const postAnswer = async (req,res)=>{
  let userId=req.user.userId
  let questionId = req.params.questionId

// Route
  // /questions/:questionId/answer/:answerId

  const {answer,answerCodeBlock}=req.body
  if (!answer){
    return res.status(404).json({
      status: false,
      message: "Missing required fields",
    });
  }
  try {
    await pool.query(
      "INSERT INTO answer(answer,answerCodeBlock,userId,questionId) VALUES(?,?,?,?)",
      [answer, answerCodeBlock, userId, questionId]
    );

    res.status(200).json({ status: true, message: "Answer posted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: false,
      message: "Something went wrong while posting your answer ",
    });
  }


}

const getAllAnswersWithQuestions=async (req,res)=>{
  const questionId = req.params.questionId

  try {
    let answerAndQuestion = await pool.query(
      `SELECT answer,answerCodeBlock,firstname,lastname,email,question,answerId FROM answer JOIN question on question.questionId=answer.questionId JOIN user on user.userId = answer.userId where answer.questionId='${questionId}' ORDER BY answerId DESC `
    );

    res
      .status(200)
      .json({
        status: true,
        total: answerAndQuestion[0].length,
        answers: answerAndQuestion[0],
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: false,
      message: "Something went wrong while getting answer ",
    });
  }
}


module.exports= {postAnswer,getAllAnswersWithQuestions}