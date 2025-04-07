# mkdir temp
# cd temp
git clone https://github.com/cemreefe/SimplyMarkdown
cd SimplyMarkdown
pip install -r requirements.txt
eval "$(sed -n '26p' ../.github/workflows/render.yaml) --root \"\"" 
cd ../output
python -m http.server 
