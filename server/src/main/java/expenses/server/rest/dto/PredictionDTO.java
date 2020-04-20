package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PredictionDTO {

	private final Long id;

	private final Long value;

	private final CategoryDTO category;

}
