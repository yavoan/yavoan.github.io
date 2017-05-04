using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Laser : MonoBehaviour {
	LineRenderer line;
	public RaycastHit laserHit;
	public float tim;
	public static float maxLaserTime;
	// Use this for initialization
	void Start () {
		line = gameObject.GetComponent<LineRenderer> ();
		line.enabled = false;
		tim = 0f;
		maxLaserTime = 150;
	}
	
	// Update is called once per frame
	void Update () {
		if (maxLaserTime < 0)
			maxLaserTime = 0;
		if (Input.GetButton ("Laser") && maxLaserTime>0) {
			maxLaserTime -= .5f;
			line.enabled = true;
			Ray laser = new Ray (transform.position, transform.forward);
			line.SetPosition (0, laser.origin);
			line.SetPosition (1, laser.GetPoint (200));
			if (Physics.Raycast (laser, out laserHit, 200)) {
				tim += Time.deltaTime;
				if (laserHit.collider.tag == "enemy" && tim > 1) {
					Destroy (laserHit.collider.gameObject);

					tim = 0;
				}
			}
		} else {
			line.enabled = false;
			tim = 0;
		}
	}
}
