using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Gun : MonoBehaviour {
	public Rigidbody bulletPrefab;
	public float throwSpeed = 1900.0f;
	public static int maxBullets;
	public GameObject gunVisual;
	// Use this for initialization
	void Start () {
		maxBullets = 30;
	}
	
	// Update is called once per frame
	void Update () {
		if (maxBullets == 0 && Laser.maxLaserTime<=0)
			Destroy (gunVisual);
		if(Input.GetButtonDown("Fire2") && maxBullets>0){
			maxBullets--;
			Rigidbody newBullets = Instantiate(bulletPrefab,
				transform.position, transform.rotation) as Rigidbody;
			newBullets.name = "bullet";
			newBullets.velocity = (transform.forward * throwSpeed);
		}
	}
}
