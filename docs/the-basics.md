ChatGPT4 | Midjourney:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rift Valley University Jimma Campus - Distance Learning System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0; /* Light gray background */
        }

        .container {
            width: 90%;
            max-width: 1200px;
            margin: 20px auto;
            background-color: #fff; /* White container background */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }

        h1 {
            text-align: center;
            color: #0056b3; /* Dark blue heading */
        }

        nav {
            background-color: #0056b3; /* Dark blue navbar */
            overflow: hidden;
            border-radius: 8px;
        }

        nav a {
            float: left;
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        nav a:hover {
            background-color: #003366; /* Darker blue on hover */
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            color: #333;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        textarea,
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 16px;
        }

        button {
            background-color: #007bff; /* Bright blue button */
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #0056b3; /* Darker blue on hover */
        }

        section {
            margin-top: 30px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9; /* Light gray section background */
        }

        table {
            width: 100%;
            border-collapse: collapse;

            margin-top: 10px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #e9ecef;
            color: #333;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }

        /* RVU Specific Styling */
        .rvu-logo {
            display: block;
            margin: 0 auto;
            max-width: 200px; /* Adjust as needed */
        }
    </style>
</head>
<body>

    <div class="container">

        <img src="rvu_jimma_logo.png" alt="Rift Valley University Jimma Campus Logo" class="rvu-logo">  <!-- Replace with actual logo path -->
        <h1>Distance Learning Management System</h1>

        <nav>
            <a href="#registration">Registration</a>
            <a href="#login">Login</a>
            <a href="#exam">Exam</a>
            <a href="#grade">View Grade</a>
            <a href="#courses">View Courses</a>
            <a href="#assignment">Submit Assignment</a>
        </nav>

        <!-- Registration Section -->
        <section id="registration">
            <h2>Registration</h2>
            <form>
                <div class="form-group">
                    <label for="student_id">Student ID:</label>
                    <input type="text" id="student_id" name="student_id" required placeholder="RVU/JMC/DIST/2024/...">
                </div>
                <div class="form-group">
                    <label for="name">Full Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="Your email address">
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required placeholder="Create a strong password">
                </div>
                 <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input type="text" id="phone" name="phone" required placeholder="Enter your Phone Number">
                </div>

                <button type="submit">Register</button>
            </form>
        </section>
        </p>

        <!-- Login Section -->
        <section id="login">
            <h2>Login</h2>
            <form>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your registered email">
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required placeholder="Enter your password">
                </div>
                <button type="submit">Login</button>
            </form>
        </section>

        <!-- Exam Section -->
        <section id="exam">
            <h2>Take Exam</h2>
            <p><b>Instructions:</b> Please select the best answer for each question.  Once submitted, you cannot retake the exam.</p>
            <form>
                <h3>Question 1</h3>
                <div class="form-group">
                    <p>What is the capital of Ethiopia?</p>
                    <label><input type="radio" name="q1" value="a">A. Nairobi</label><br>
                    <label><input type="rad

io" name="q1" value="b">B. Addis Ababa</label><br>
                    <label><input type="radio" name="q1" value="c">C. Asmara</label><br>
                </div>

                <h3>Question 2</h3>
                <div class="form-group">
                    <p>What is the main language spoken in Jimma?</p>
                    <label><input type="radio" name="q2" value="a">A. Amharic</label><br>
                    <label><input type="radio" name="q2" value="b">B. Oromo</label><br>
                    <label><input type="radio" name="q2" value="c">C. Tigrinya</label><br>
                </div>
                <button type="submit">Submit Exam</button>
            </form>
        </section>
        </p>

        <!-- View Grade Section -->
        <section id="grade">
            <h2>View Grade</h2>
            <p>Your Current Grades:</p>
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Grade</th>
                        <th>Credit Hours</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Introduction to Computer Science</td>
                        <td>85%</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>History of Ethiopia</td>
                        <td>92%</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Calculus</td>
                        <td>78%</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
        </section>
</p>
        <!-- View Courses Section -->
        <section id="courses">
            <h2>View Courses</h2>
            <ul>
                <li>Introduction to Computer Science</li>
                <li>Data Structures and Algorithms</li>
                <li>Database Management Systems</li>
                <li>Object-Oriented Programming</li>
                <li>History of Ethiopia</li>
                <li>Calculus</li>
            </ul>
        </section>

        <!-- Submit Assignment Section -->
        <section id="assignment">
            <h2>Submit Assignment</h2>
            <form>
                <div class="form-group">
                    <label for="course">Course:</label>
                    <select id="course" name="course">
                        <option value="cs">Introduction to Computer Science</option>
                        <option value="dsa">Data Structures and Algorithms</option>
                        <option value="dbms">Database Management Systems</option>
                         <option value="oops">Object-Oriented Programming</option>
                        <option value="hoe">History of Ethiopia</option>
                        <option value="calculus">Calculus</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="assignment_name">Assignment Name:</label>
                     <input type="text" id="assignment_name" name="assignment_name" required placeholder="Enter the assignment title (e.g., 'Assignment 1 - Arrays')">
                </div>
                <div class="form-group">
                    <label for="assignment_file">Choose File:</label>
                    <input type="file" id="assignment_file" name="assignment_file" accept=".pdf,.doc,.docx,.zip,.rar" required>
                </div>
                <button type="submit">Submit Assignment</button>
            </form>
        </section>

    </div>

</body>
</html>
