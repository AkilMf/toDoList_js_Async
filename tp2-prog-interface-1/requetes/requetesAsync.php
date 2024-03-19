<?php
	// Pour accéder à la base de données
	require_once('fonctionsDB.php');


	$request_payload = file_get_contents('php://input');
    $data = json_decode($request_payload, true);


    if (isset($data['action'])) {

        // Switch en fonction de l'action envoyée
        switch ($data['action']) {

            case 'getAllTaches':

                $dataTache = array();

                $taches = getAllTaches($data['order']);

                while( $tache = mysqli_fetch_assoc($taches)){
                    $dataTache[] = $tache;
                }

                header('Content-type: application/json; charset=utf-8');
                echo json_encode($dataTache);

				break;
            

			case 'getTaches':

				$data = array();

				// Obtenir les Taches dans la BD
				$taches = getAllTaches();

				// Récupérer la ligne suivante d'un ensemble de résultats sous forme de tableau associatif
				while ($tache = mysqli_fetch_assoc($taches)) { 
					$data[] = $tache;
				}
			
				header('Content-type: application/json; charset=utf-8');
				echo json_encode($data);

				break;

            case 'ajouteTache':

                if (isset($data['tache']) && isset($data['description']) && isset($data['importance'])){

                    $tache = htmlspecialchars($data['tache']);
                    $description = htmlspecialchars($data['description']);
                    $importance = htmlspecialchars($data['importance']);
            
                    $return_id = ajouteTache($tache, $description, $importance);
            
                    echo $return_id;
            
                } else {
                    echo 'Erreur query string';
                }

                break;

                case 'supprimeTache':

                    if (isset($data['id'])) {

                        $id = htmlspecialchars($data['id']);
                
                        supprimeTache($id);
                
                    } else {
                        echo 'Erreur query string';
                    }
                    break;

                case 'getTache':
                    if (isset($data['id'])) {
                        $tache = mysqli_fetch_assoc(getTache($data['id']));
                        header('Content-type: application/json; charset=utf-8');
                        echo json_encode($tache);
                    }
                    break;
        }
    } else {
        echo 'Erreur action';					
    }
?>