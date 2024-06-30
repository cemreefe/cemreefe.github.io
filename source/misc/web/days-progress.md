<head->
    <style>
        .container-local {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .input-container-local {
            margin-bottom: 10px;
        }

        input.date-local {
            padding: 5px;
            margin-left: 10px;
        }

        .button-local {
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .button-local:hover {
            background-color: #45a049;
        }

        .progress-container-local {
            margin-top: 20px;
            width: 100%;
            background-color: #ddd;
            border-radius: 5px;
            overflow: hidden;
        }

        .progress-bar {
            height: 30px;
            width: 0;
            background-color: #4CAF50;
            transition: width 0.5s;
        }

        .progress-percentage {
            margin-top: 10px;
            font-size: 16px;
        }
    </style>
<head->
<body->
    <div class="container-local">
        <h1>Date Progress Bar</h1>
        <div class="input-container-local">
            <label for="start-date">Start Date:</label>
            <input class="date-local" type="date" id="start-date">
        </div>
        <div class="input-container-local">
            <label for="end-date">End Date:</label>
            <input class="date-local" type="date" id="end-date">
        </div>
        <button class="button-local" onclick="calculateProgress()">Calculate Progress</button>
        <div class="progress-container-local">
            <div id="progress-bar" class="progress-bar"></div>
        </div>
        <div id="progress-percentage" class="progress-percentage"></div>
    </div>
    <script>
        window.onload = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const startDateParam = urlParams.get('start');
        const endDateParam = urlParams.get('end');
        if (startDateParam) {
            document.getElementById('start-date').value = startDateParam;
        }
        if (endDateParam) {
            document.getElementById('end-date').value = endDateParam;
        }
        if (startDateParam && endDateParam) {
            calculateProgress();
        }
    };
    function calculateProgress() {
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);
        const today = new Date();
        if (isNaN(startDate) || isNaN(endDate)) {
            alert('Please enter valid start and end dates.');
            return;
        }
        if (startDate > endDate) {
            alert('End date should be greater than start date.');
            return;
        }
        if (today < startDate) {
            alert('Start date should be in the past or today.');
            return;
        }
        const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
        const elapsedDays = (today - startDate) / (1000 * 60 * 60 * 24);
        const progressPercentage = Math.min((elapsedDays / totalDays) * 100, 100);
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-percentage');
        progressBar.style.width = progressPercentage + '%';
        progressText.textContent = `Progress: ${progressPercentage.toFixed(1)}%`;
        // Update the query string in the URL
        const newUrl = `${window.location.pathname}?start=${document.getElementById('start-date').value}&end=${document.getElementById('end-date').value}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        // Update the page title
        document.title = `${progressPercentage.toFixed(1)}% - Date Progress Bar`;
    }
    </script>
</body->
