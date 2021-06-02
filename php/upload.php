
<?php
if(isset($_FILES['archivo']['name'])){

   /* Getting file name */
   $filename = $_FILES['archivo']['name'];

   /* Location */
   $location = "../archivos/".$filename;
   $FileType = pathinfo($location,PATHINFO_EXTENSION);
   $FileType = strtolower($FileType);

   /* Valid extensions */
   $valid_extensions = array("pdf");

   $response = 0;
   /* Check file extension */
   if(in_array(strtolower($FileType), $valid_extensions)) {
      /* Upload file */
      if(move_uploaded_file($_FILES['archivo']['tmp_name'],$location)){
         $response = $location;
      }
   }

   echo $response;
   //exit;
}
?>