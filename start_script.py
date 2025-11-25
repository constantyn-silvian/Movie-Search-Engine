import subprocess

process1 = subprocess.Popen("npm run dev", shell=True, cwd="./frontend")
process2 = subprocess.Popen("node index.js", shell=True, cwd="./backend")