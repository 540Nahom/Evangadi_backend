const {pool} = require("../Config/db")


const postQuestion = async (req,res)=>{



  const { question, questionDescription, questionCodeBlock, tags } = req.body;


const userId = req.user.userId;
// console.log(userId)

  if(!question){
    return res.status(404).json({
      status: false,
      message:"Missing required fields"
    })
  }
try {
  await pool.query(
    "INSERT INTO question(question,questionDescription,questionCodeBlock,tags,userId)VALUES(?,?,?,?,?) ",
    [question, questionDescription, questionCodeBlock, tags, userId]
  );

  res.status(201).json({
    status:true,
    message:"Question Posted Successfuly"
  })
} catch (err) {
  console.log(err.message)
  res.status(500).json({
    status: false,
    message: "Something went wrong "
  })
}
// protect, postQuestion
}





const getAllQuestions = async (req,res)=>{
  try {
    let questions = await pool.query(
      "SELECT questionId, question, questionDescription, questionCodeBlock, firstname, lastname, email FROM question JOIN user ON question.userId = user.userId ORDER BY questionId DESC"
    );

    res.status(200).json({
      status: true,
      total: questions[0].length,
      questions: questions[0],
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: false,
      message: "Something went wrong ",
    });
  }
}




const singleQuestion = async (req,res)=>{
  let questionId=req.params.questionId;
  try {
    let question = await pool.query(
      `SELECT questionId, question,questionDescription, questionCodeBlock,firstname,lastname,email FROM questions JOIN user ON questions.userId = user.userId WHERE questionId = '${questionId}' `
    );
    // console.log(question[0])
    // res.send(question[0])
    res.status(200).json({ status: true, question: question[0][0] });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: false,
      message: "Something went wrong ",
    });
  }
}


module.exports={postQuestion, getAllQuestions,singleQuestion}