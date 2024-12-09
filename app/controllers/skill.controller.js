import { Skill } from '../models/skill.model.js';

// Create a new skill
export const createSkill = (req, res) => {
    const { gig_id, skill_name, proficiency_level } = req.body;

    Skill.create({
        gig_id,
        skill_name,
        proficiency_level
    })
        .then(skill => {
            res.status(201).json(skill);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error creating skill"
            });
        });
};

// Get all skills for a specific gig (user)
export const getSkillsByGig = (req, res) => {
    const gig_id = req.params.gig_id;

    Skill.findAll({ where: { gig_id } })
        .then(skills => {
            if (skills.length === 0) {
                return res.status(404).send({
                    message: `No skills found for gig with id ${gig_id}`
                });
            }
            res.status(200).json(skills);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: `Error retrieving skills for gig with id ${gig_id}`
            });
        });
};

// delete a skill
export const deleteSkillByID = (req, res) => {
    const skill_id = req.params.id;

    Skill.findByPk(skill_id)
        .then(skill => {
            if (!skill) {
                return res.status(404).send({
                    message: `Skill with ID ${skill_id} not found.`
                });
            }

            return skill.destroy()
                .then(() => {
                    res.status(200).send({
                        message: `Skill with ID ${skill_id} was deleted successfully.`
                    });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send({
                        message: `Error occurred while deleting the skill with ID ${skill_id}.`
                    });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: `Error retrieving skill with ID ${skill_id}.`
            });
        });
};

// update a skill

export const updateSkill = async (req, res) => {
    const skill_id = req.params.id; // Get skill_id from the URL parameters
    const { skill_name, proficiency_level, gig_id } = req.body; // Fields to update

    try {
        // Find the skill by its ID
        const skill = await Skill.findByPk(skill_id);

        if (!skill) {
            return res.status(404).json({
                message: `Skill with id ${skill_id} not found.`,
            });
        }

        // Update only the fields that are provided in the request body
        const updatedSkill = await skill.update({
            skill_name: skill_name ?? skill.skill_name,
            proficiency_level: proficiency_level ?? skill.proficiency_level,
            gig_id: gig_id ?? skill.gig_id,
        });

        res.status(200).json({
            message: 'Skill updated successfully.',
            skill: updatedSkill,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating skill.',
        });
    }
};
