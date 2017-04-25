using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AICircle : MonoBehaviour {
	public float rotationSpeed = 50.0f;
	public Vector3 right;
	public Vector3 up;
	public Vector3 down;
	public float time;
	public Vector3 left;

	// Use this for initialization
	void Start () {
		down = this.transform.position;
		time = 0;
		right = new Vector3 (down.x+3,down.y,down.z);
		left = new Vector3 (down.x,down.y,down.z+3);
		up = new Vector3 (down.x+3,down.y,down.z+3);
	}
	
	// Update is called once per frame
	void Update () {
		if (time < 2.0f) {
			this.transform.position = Vector3.MoveTowards (this.transform.position,right,5.0f*Time.deltaTime);
		}
		else if (time < 4.0f) {
			this.transform.position = Vector3.MoveTowards (this.transform.position,up,5.0f*Time.deltaTime);
		}
		else if (time < 6.0f) {
			this.transform.position = Vector3.MoveTowards (this.transform.position,left,5.0f*Time.deltaTime);
		}
		else if (time < 8.0f) {
			this.transform.position = Vector3.MoveTowards (this.transform.position,down,5.0f*Time.deltaTime);
		}
		else if (time < 10.0f) {
			time = 0;
		}
		time += Time.deltaTime;
			
	}
	void OnCollisionEnter(Collision col){
			if(col.gameObject.tag == "Player"){
				Destroy(col.gameObject);
			}
	}

}
