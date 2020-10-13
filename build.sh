echo "========================COMMENCING BUILD========================"

echo "***** Copying frontend files to backend public folder..."
cd ./server
mkdir -p public
cp -r ../client/* public/
echo "***** Installing backend package dependencies..."
npm install
cd ../

echo "=========================BUILD COMPLETE========================="