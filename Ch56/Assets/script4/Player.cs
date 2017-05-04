using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityStandardAssets.Characters.FirstPerson;

public class Player : MonoBehaviour {
	CharacterController cc;
	FirstPersonController controller;
	public static int starCount;
	public static bool canFly;
	public static int lives;
	public GameObject life1;
	public GameObject life2;
	public GameObject life3;
	public GameObject jetPack;
	public GameObject score;
	public GameObject ammo;
	public static bool teleRecently;
	float timeElp;

	// Use this for initialization
	void Start () {
		RenderSettings.fog = false;
		RenderSettings.fogColor = new Color (.2f, .4f, .8f, .5f);
		controller = GameObject.FindObjectOfType<FirstPersonController> ();
		cc = gameObject.GetComponent<CharacterController> ();
		starCount = 0;
		canFly = false;
		lives = 1;
		life2.GetComponent<RawImage>().enabled = false;
		life3.GetComponent<RawImage>().enabled = false;
		jetPack.GetComponent<RawImage>().enabled = false;
		teleRecently = false;
		timeElp = 0;


	}

	// Update is called once per frame
	void Update () {
		if (lives == 0) {
			GameObject.Find ("loseText").GetComponent<Text> ().enabled = true;
			life1.GetComponent<RawImage>().enabled = false;
			Destroy (gameObject);
		}
		if (starCount == 15) {
			GameObject.Find ("winText").GetComponent<Text> ().enabled = true;
			Destroy (gameObject);
		}







		RenderSettings.fog = underWater ();
		Vector3 t = transform.position;
		score.GetComponent<Text> ().text = "Stars: " + starCount+"/15";
		ammo.GetComponent<Text> ().text = "S:"+Weapons.maxSpear+"/20 B:"+Gun.maxBullets+"/30 L:"+Mathf.Round(Laser.maxLaserTime);
		if (teleRecently) {
			timeElp += Time.deltaTime;
			if (timeElp > 2) {
				timeElp = 0;
				teleRecently = false;
			}
		}

		if (lives == 1) {
			life1.GetComponent<RawImage>().enabled = true;
			life2.GetComponent<RawImage>().enabled = false;
			life3.GetComponent<RawImage>().enabled = false;
		} else if (lives == 2) {
			life1.GetComponent<RawImage>().enabled = true;
			life2.GetComponent<RawImage>().enabled = true;
			life3.GetComponent<RawImage>().enabled = false;
		} else if (lives == 3) {
			life1.GetComponent<RawImage>().enabled = true;
			life2.GetComponent<RawImage>().enabled = true;
			life3.GetComponent<RawImage>().enabled = true;
		}
		if(canFly){
			jetPack.GetComponent<RawImage> ().enabled = true;
		}
		if (underWater ()) {
			//normally walk is 5 and run is 10, gravity 2
			controller.m_WalkSpeed = 3;
			controller.m_RunSpeed = 5;
			controller.m_GravityMultiplier = .3f;
			controller.m_StickToGroundForce = 5;
		}else if(canFly && Input.GetButton ("Fly") ){
			t.y += 1;
			transform.position = t;
		  	controller.m_GravityMultiplier = .5f;
			controller.m_StickToGroundForce = 0;
			cc.Move(Vector3.zero);

		}else if(cc.isGrounded) {
			controller.m_WalkSpeed = 5;
			controller.m_RunSpeed = 10;
			controller.m_GravityMultiplier =2.0f;
			controller.m_StickToGroundForce = 10;

		}


	}
	bool underWater(){
		return gameObject.transform.position.y < 27 && gameObject.transform.position.z>140;
	}
}
