@echo off
  wt --title Front pwsh -c "npm run front-start"; --title Back pwsh -c "cd .\api && python -m flask run"
exit